export const getGoogleUrl = () => {
    const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`;
    const clientId = import.meta.env.VITE_GOOGLE_AUTHORIZED_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_GOOGLE_AUTHORIZED_REDIRECT_URI;

    // Kiểm tra giá trị không phải là undefined hoặc null
    if (!clientId || !redirectUri) {
        console.error("Client ID hoặc Redirect URI không hợp lệ.");
        return null;
    }

    const options = {
      client_id: clientId,
      redirect_uri: redirectUri ,
      access_type: "offline",
      response_type: 'code',
      prompt: 'consent',
      scope: [
          'https://www.googleapis.com/auth/userinfo.profile',
          'https://www.googleapis.com/auth/userinfo.email',
        ].join(' '),
    };
  
    const qs = new URLSearchParams(options);
  
    const googleUrl = `${rootUrl}?${qs.toString()}`;

    return googleUrl;
};
  