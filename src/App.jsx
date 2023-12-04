import "./App.css";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import MagicLinkAuth from "./MagicLinkAuth";
import Account from "./Account";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="container" style={{ padding: "50px 0 100px 0" }}>
      {!session ? (
        <>
          <MagicLinkAuth />
          <Auth
            supabaseClient={supabase}
            providers={["google"]}
            appearance={{ theme: ThemeSupa }}
            theme="dark"
            showLinks={false}
            onlyThirdPartyProviders={true}
          />
        </>
      ) : (
        <Account key={session.user.id} session={session} />
      )}
    </div>
  );
}

export default App;
