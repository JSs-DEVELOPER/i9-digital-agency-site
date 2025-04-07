
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AnalyticsScript {
  script?: string | null;
  pixel_id?: string | null;
}

interface GoogleGTM {
  tag_manager_script?: string | null;
  gtm_head_snippet?: string | null;
}

interface CookieScript {
  script?: string | null;
  html?: string | null;
  script_extra?: string | null;
}

export const AnalyticsScripts = () => {
  const [analyticsData, setAnalyticsData] = useState<{
    google_analytics: AnalyticsScript | null;
    google_ads: AnalyticsScript | null;
    facebook_instagram: AnalyticsScript | null;
    bing_microsoft: AnalyticsScript | null;
    linkedin: AnalyticsScript | null;
    google_gtm: GoogleGTM | null;
    cookie_rastreio: CookieScript | null;
    codigos_universais: CookieScript | null;
  }>({
    google_analytics: null,
    google_ads: null,
    facebook_instagram: null,
    bing_microsoft: null,
    linkedin: null,
    google_gtm: null,
    cookie_rastreio: null,
    codigos_universais: null
  });

  useEffect(() => {
    const fetchAnalyticsScripts = async () => {
      try {
        // Google Analytics 4
        const { data: ga4Data } = await supabase
          .from('google_analytics4')
          .select('script, pixel_id')
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        // Google Ads
        const { data: adsData } = await supabase
          .from('google_ads')
          .select('script, pixel_id')
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        // Facebook/Instagram
        const { data: fbData } = await supabase
          .from('facebook_instagram')
          .select('script, pixel_id')
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        // Bing/Microsoft Ads
        const { data: bingData } = await supabase
          .from('bing_microsoft_ads')
          .select('script, pixel_id')
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        // LinkedIn
        const { data: linkedinData } = await supabase
          .from('linkedin')
          .select('script, linkedin_id')
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        // Google Tag Manager
        const { data: gtmData } = await supabase
          .from('google_gtm')
          .select('tag_manager_script, gtm_head_snippet')
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        // Cookie Tracking
        const { data: cookieData } = await supabase
          .from('cookie_rastreio')
          .select('script, html, script_extra')
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        // Universal Codes
        const { data: codesData } = await supabase
          .from('codigos_universais')
          .select('script, html, script_extra')
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        setAnalyticsData({
          google_analytics: ga4Data,
          google_ads: adsData,
          facebook_instagram: fbData,
          bing_microsoft: bingData,
          linkedin: linkedinData,
          google_gtm: gtmData,
          cookie_rastreio: cookieData,
          codigos_universais: codesData
        });
      } catch (error) {
        console.error('Erro ao carregar scripts de analytics:', error);
      }
    };

    fetchAnalyticsScripts();
  }, []);

  // Inject scripts directly into the document head
  useEffect(() => {
    // Function to create and inject a script element
    const injectScript = (scriptContent: string) => {
      const scriptEl = document.createElement('script');
      scriptEl.innerHTML = scriptContent;
      document.head.appendChild(scriptEl);
      return scriptEl;
    };

    // Function to create and inject HTML content (for divs, etc.)
    const injectHTML = (htmlContent: string) => {
      const containerEl = document.createElement('div');
      containerEl.style.display = 'none';
      containerEl.innerHTML = htmlContent;
      document.body.appendChild(containerEl);
      return containerEl;
    };

    const injectedElements: (HTMLScriptElement | HTMLDivElement)[] = [];
    
    // Add Google Analytics script
    if (analyticsData.google_analytics?.script) {
      injectedElements.push(injectScript(analyticsData.google_analytics.script));
    }

    // Add Google Ads script
    if (analyticsData.google_ads?.script) {
      injectedElements.push(injectScript(analyticsData.google_ads.script));
    }

    // Add Facebook/Instagram script
    if (analyticsData.facebook_instagram?.script) {
      injectedElements.push(injectScript(analyticsData.facebook_instagram.script));
    }

    // Add Bing/Microsoft script
    if (analyticsData.bing_microsoft?.script) {
      injectedElements.push(injectScript(analyticsData.bing_microsoft.script));
    }

    // Add LinkedIn script
    if (analyticsData.linkedin?.script) {
      injectedElements.push(injectScript(analyticsData.linkedin.script));
    }

    // Add Google Tag Manager scripts
    if (analyticsData.google_gtm?.gtm_head_snippet) {
      injectedElements.push(injectScript(analyticsData.google_gtm.gtm_head_snippet));
    }
    
    if (analyticsData.google_gtm?.tag_manager_script) {
      injectedElements.push(injectScript(analyticsData.google_gtm.tag_manager_script));
    }

    // Add Cookie Tracking scripts and HTML
    if (analyticsData.cookie_rastreio?.script) {
      injectedElements.push(injectScript(analyticsData.cookie_rastreio.script));
    }
    
    if (analyticsData.cookie_rastreio?.html) {
      injectedElements.push(injectHTML(analyticsData.cookie_rastreio.html));
    }
    
    if (analyticsData.cookie_rastreio?.script_extra) {
      injectedElements.push(injectScript(analyticsData.cookie_rastreio.script_extra));
    }

    // Add Universal Code scripts and HTML
    if (analyticsData.codigos_universais?.script) {
      injectedElements.push(injectScript(analyticsData.codigos_universais.script));
    }
    
    if (analyticsData.codigos_universais?.html) {
      injectedElements.push(injectHTML(analyticsData.codigos_universais.html));
    }
    
    if (analyticsData.codigos_universais?.script_extra) {
      injectedElements.push(injectScript(analyticsData.codigos_universais.script_extra));
    }

    // Cleanup function to remove all injected elements when component unmounts
    return () => {
      injectedElements.forEach((element) => {
        element.parentNode?.removeChild(element);
      });
    };
  }, [analyticsData]);

  // The component doesn't render anything visible
  return null;
};
