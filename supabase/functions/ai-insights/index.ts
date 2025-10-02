import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { transactions } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Prepare transaction summary for AI
    const transactionSummary = transactions.map((t: any) => 
      `${t.category}: ₹${t.amount} - ${t.description}`
    ).join('\n');

    const systemPrompt = `You are a financial advisor AI for an Indian finance tracking app. 
Analyze the user's transactions and provide personalized insights, warnings, and recommendations.
All amounts are in Indian Rupees (₹). Focus on Indian financial context and savings culture.
Be concise, actionable, and encouraging.`;

    const userPrompt = `Analyze these recent transactions and provide 3 key insights:
${transactionSummary}

Provide insights in JSON format:
{
  "insights": [
    {
      "type": "success" | "warning" | "info",
      "title": "Brief title",
      "description": "Actionable insight"
    }
  ]
}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to your workspace." }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    // Parse the JSON response from AI
    let insights;
    try {
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        insights = JSON.parse(jsonMatch[0]);
      } else {
        // Fallback if AI doesn't return proper JSON
        insights = {
          insights: [{
            type: "info",
            title: "Analysis Complete",
            description: aiResponse.slice(0, 200)
          }]
        };
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      insights = {
        insights: [{
          type: "info",
          title: "Spending Analysis",
          description: "Based on your recent transactions, continue monitoring your spending patterns."
        }]
      };
    }

    return new Response(
      JSON.stringify(insights),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error: any) {
    console.error("Error in ai-insights function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
