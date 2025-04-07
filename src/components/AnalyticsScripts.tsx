
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Helmet } from 'react-helmet';

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

  return (
    <Helmet>
      {/* Google Analytics 4 */}
      {analyticsData.google_analytics?.script && (
        <script dangerouslySetInnerHTML={{ __html: analyticsData.google_analytics.script }} />
      )}

      {/* Google Ads */}
      {analyticsData.google_ads?.script && (
        <script dangerouslySetInnerHTML={{ __html: analyticsData.google_ads.script }} />
      )}

      {/* Facebook/Instagram */}
      {analyticsData.facebook_instagram?.script && (
        <script dangerouslySetInnerHTML={{ __html: analyticsData.facebook_instagram.script }} />
      )}

      {/* Bing/Microsoft Ads */}
      {analyticsData.bing_microsoft?.script && (
        <script dangerouslySetInnerHTML={{ __html: analyticsData.bing_microsoft.script }} />
      )}

      {/* LinkedIn */}
      {analyticsData.linkedin?.script && (
        <script dangerouslySetInnerHTML={{ __html: analyticsData.linkedin.script }} />
      )}

      {/* Google Tag Manager */}
      {analyticsData.google_gtm?.gtm_head_snippet && (
        <script dangerouslySetInnerHTML={{ __html: analyticsData.google_gtm.gtm_head_snippet }} />
      )}
      {analyticsData.google_gtm?.tag_manager_script && (
        <script dangerouslySetInnerHTML={{ __html: analyticsData.google_gtm.tag_manager_script }} />
      )}

      {/* Cookie Tracking */}
      {analyticsData.cookie_rastreio?.script && (
        <script dangerouslySetInnerHTML={{ __html: analyticsData.cookie_rastreio.script }} />
      )}
      {analyticsData.cookie_rastreio?.html && (
        <div dangerouslySetInnerHTML={{ __html: analyticsData.cookie_rastreio.html }} />
      )}
      {analyticsData.cookie_rastreio?.script_extra && (
        <script dangerouslySetInnerHTML={{ __html: analyticsData.cookie_rastreio.script_extra }} />
      )}

      {/* Universal Codes */}
      {analyticsData.codigos_universais?.script && (
        <script dangerouslySetInnerHTML={{ __html: analyticsData.codigos_universais.script }} />
      )}
      {analyticsData.codigos_universais?.html && (
        <div dangerouslySetInnerHTML={{ __html: analyticsData.codigos_universais.html }} />
      )}
      {analyticsData.codigos_universais?.script_extra && (
        <script dangerouslySetInnerHTML={{ __html: analyticsData.codigos_universais.script_extra }} />
      )}
    </Helmet>
  );
};
