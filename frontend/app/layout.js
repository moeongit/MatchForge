export const metadata = {
  title: "MatchForge",
  description: "MatchForge matchmaking dashboard"
};

import "./globals.css";
import AppNav from "../components/AppNav";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="app-header">
          <div className="app-header-inner">
            <div>
              <p className="eyebrow">Matchmaking Ops Console</p>
              <h1>MatchForge</h1>
            </div>
            <AppNav />
          </div>
        </header>
        <main className="content">{children}</main>
        <footer className="app-footer">MatchForge UI - Ready for deployment hardening</footer>
      </body>
    </html>
  );
}
