
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

  // Inject HEAD scripts
  useEffect(() => {
    // Function to create and inject a script element in head
    const injectHeadScript = (scriptContent: string) => {
      const scriptEl = document.createElement('script');
      scriptEl.innerHTML = scriptContent;
      document.head.appendChild(scriptEl);
      return scriptEl;
    };

    // Create array to track injected elements for cleanup
    const headInjectedElements: HTMLElement[] = [];
    
    // Inject Google Analytics 4 script in head
    if (analyticsData.google_analytics?.script) {
      headInjectedElements.push(injectHeadScript(analyticsData.google_analytics.script));
    }

    // Inject Google Ads script in head
    if (analyticsData.google_ads?.script) {
      headInjectedElements.push(injectHeadScript(analyticsData.google_ads.script));
    }

    // Inject Facebook/Instagram script in head
    if (analyticsData.facebook_instagram?.script) {
      headInjectedElements.push(injectHeadScript(analyticsData.facebook_instagram.script));
    }

    // Inject Bing/Microsoft script in head
    if (analyticsData.bing_microsoft?.script) {
      headInjectedElements.push(injectHeadScript(analyticsData.bing_microsoft.script));
    }

    // Inject LinkedIn script in head
    if (analyticsData.linkedin?.script) {
      headInjectedElements.push(injectHeadScript(analyticsData.linkedin.script));
    }

    // Inject Google GTM head snippet in head
    if (analyticsData.google_gtm?.gtm_head_snippet) {
      headInjectedElements.push(injectHeadScript(analyticsData.google_gtm.gtm_head_snippet));
    }

    // Inject Universal Codes script in head
    if (analyticsData.codigos_universais?.script) {
      headInjectedElements.push(injectHeadScript(analyticsData.codigos_universais.script));
    }

    // Inject Cookie Tracking script in head
    if (analyticsData.cookie_rastreio?.script) {
      headInjectedElements.push(injectHeadScript(analyticsData.cookie_rastreio.script));
    }

    // Cleanup function to remove all injected head elements when component unmounts
    return () => {
      headInjectedElements.forEach((element) => {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      });
    };
  }, [analyticsData]);

  // Inject BODY scripts and HTML
  useEffect(() => {
    // Function to create and inject a script element in body
    const injectBodyScript = (scriptContent: string) => {
      const scriptEl = document.createElement('script');
      scriptEl.innerHTML = scriptContent;
      document.body.appendChild(scriptEl);
      return scriptEl;
    };

    // Function to create and inject HTML content (for divs, etc.) in body
    const injectBodyHTML = (htmlContent: string) => {
      const containerEl = document.createElement('div');
      containerEl.style.display = 'none';
      containerEl.innerHTML = htmlContent;
      document.body.appendChild(containerEl);
      return containerEl;
    };

    // Create array to track injected elements for cleanup
    const bodyInjectedElements: HTMLElement[] = [];
    
    // Inject Google GTM body script
    if (analyticsData.google_gtm?.tag_manager_script) {
      bodyInjectedElements.push(injectBodyScript(analyticsData.google_gtm.tag_manager_script));
    }
    
    // Inject Cookie Tracking HTML in body
    if (analyticsData.cookie_rastreio?.html) {
      bodyInjectedElements.push(injectBodyHTML(analyticsData.cookie_rastreio.html));
    }
    
    // Inject Cookie Tracking extra script in body
    if (analyticsData.cookie_rastreio?.script_extra) {
      bodyInjectedElements.push(injectBodyScript(analyticsData.cookie_rastreio.script_extra));
    }
    
    // Inject Universal Codes HTML in body
    if (analyticsData.codigos_universais?.html) {
      bodyInjectedElements.push(injectBodyHTML(analyticsData.codigos_universais.html));
    }
    
    // Inject Universal Codes extra script in body
    if (analyticsData.codigos_universais?.script_extra) {
      bodyInjectedElements.push(injectBodyScript(analyticsData.codigos_universais.script_extra));
    }

    // Cleanup function to remove all injected body elements when component unmounts
    return () => {
      bodyInjectedElements.forEach((element) => {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      });
    };
  }, [analyticsData]);

  // The component doesn't render anything visible
  return null;
};
