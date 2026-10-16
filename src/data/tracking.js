// Google tag configuration for Google Ads and GA4.
//
// Everything is off while these are empty: Layout.astro loads gtag.js only
// when GA4_ID or ADS_ID is set, and window.dgTrack (called by every enquiry
// form and by WhatsApp / phone / email clicks) does nothing without it. Fill
// the IDs in, rebuild, and tracking turns on site-wide - no other file changes.
//
//   GA4_ID         GA4 > Admin > Data streams > Measurement ID   "G-XXXXXXXXXX"
//   ADS_ID         Google Ads > Goals > Conversions > tag setup  "AW-XXXXXXXXXX"
//   ADS_LEAD_LABEL the label after the slash in send_to for the
//                  "form submitted" conversion                   "AbCdEfGhIjK"
//   ADS_CONTACT_LABEL  optional second conversion for WhatsApp / phone / email
//                  clicks; leave empty to report those to GA4 only
export const GA4_ID = '';
export const ADS_ID = '';
export const ADS_LEAD_LABEL = '';
export const ADS_CONTACT_LABEL = '';
