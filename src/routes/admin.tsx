import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, Check, LogOut, RefreshCw, Save } from "lucide-react";
import { useState, type FormEvent } from "react";

import {
  adminLogin,
  adminLogout,
  getAdminState,
  saveAdminPricing,
  saveAdminRequest,
} from "../lib/package-actions";
import {
  formatINR,
  formatMoney,
  PRICING_LABELS,
  type CurrencyCode,
  type PackageRequestRecord,
  type PackageRequestStatus,
  type ServicePricing,
} from "../lib/package-types";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Gazab Admin" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  loader: () => getAdminState(),
  component: AdminPage,
});

function AdminPage() {
  const initialState = Route.useLoaderData();
  const [state, setState] = useState(initialState);
  const getState = useServerFn(getAdminState);
  const login = useServerFn(adminLogin);
  const logout = useServerFn(adminLogout);
  const router = useRouter();
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const refresh = async () => setState(await getState());
  const submitLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setLoggingIn(true);
    setLoginError("");
    try {
      await login({
        data: {
          email: String(form.get("email") || ""),
          password: String(form.get("password") || ""),
        },
      });
      await refresh();
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : "Could not sign in");
    } finally {
      setLoggingIn(false);
    }
  };

  if (!state.authenticated)
    return (
      <main className="admin-login-page">
        <form onSubmit={submitLogin} className="admin-login-card">
          <span className="admin-mark">Z</span>
          <p className="kicker">PRIVATE AREA</p>
          <h1>
            GAZAB
            <br />
            <em>ADMIN.</em>
          </h1>
          <label>
            ADMIN EMAIL
            <input name="email" type="email" required autoComplete="username" />
          </label>
          <label>
            PASSWORD
            <input name="password" type="password" required autoComplete="current-password" />
          </label>
          {loginError && (
            <p className="admin-error" role="alert">
              {loginError}
            </p>
          )}
          <button type="submit" disabled={loggingIn}>
            {loggingIn ? "SIGNING IN..." : "SIGN IN"}
          </button>
          <Link to="/">
            <ArrowLeft size={17} /> BACK TO WEBSITE
          </Link>
        </form>
      </main>
    );

  return (
    <AdminDashboard
      initialRequests={state.requests}
      initialPricing={state.pricing}
      onRefresh={refresh}
      onLogout={async () => {
        await logout();
        await router.navigate({ to: "/admin" });
        await refresh();
      }}
    />
  );
}

function AdminDashboard({
  initialRequests,
  initialPricing,
  onRefresh,
  onLogout,
}: {
  initialRequests: PackageRequestRecord[];
  initialPricing: ServicePricing;
  onRefresh: () => Promise<void>;
  onLogout: () => Promise<void>;
}) {
  const [requests, setRequests] = useState(initialRequests);
  const [pricing, setPricing] = useState(initialPricing);
  const [activeTab, setActiveTab] = useState<"requests" | "pricing">("requests");
  const [saving, setSaving] = useState("");
  const [message, setMessage] = useState("");
  const saveRequest = useServerFn(saveAdminRequest);
  const savePricing = useServerFn(saveAdminPricing);
  const newCount = requests.filter((request) => request.status === "new").length;
  const wonInr = requests
    .filter((request) => request.status === "won" && (request.estimate.currency || "INR") === "INR")
    .reduce((sum, request) => sum + request.estimate.firstMonthTotal, 0);
  const wonUsd = requests
    .filter((request) => request.status === "won" && request.estimate.currency === "USD")
    .reduce((sum, request) => sum + request.estimate.firstMonthTotal, 0);

  const updateRequestLocal = (id: string, patch: Partial<PackageRequestRecord>) =>
    setRequests((current) =>
      current.map((request) => (request.id === id ? { ...request, ...patch } : request)),
    );
  const persistRequest = async (request: PackageRequestRecord) => {
    setSaving(request.id);
    setMessage("");
    try {
      await saveRequest({
        data: { id: request.id, status: request.status, adminNotes: request.adminNotes },
      });
      setMessage("Request updated.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not save request");
    } finally {
      setSaving("");
    }
  };

  return (
    <main className="admin-page">
      <header className="admin-header">
        <Link to="/" className="admin-brand">
          <span>Z</span>
          <b>GAZAB ADMIN</b>
        </Link>
        <nav>
          <a href="/" target="_blank" rel="noreferrer">
            VIEW WEBSITE ↗
          </a>
          <button
            onClick={async () => {
              await onRefresh();
              window.location.reload();
            }}
          >
            <RefreshCw size={17} /> REFRESH
          </button>
          <button onClick={onLogout}>
            <LogOut size={17} /> LOG OUT
          </button>
        </nav>
      </header>
      <section className="admin-shell">
        <div className="admin-title">
          <div>
            <p className="kicker">PACKAGE CONTROL CENTRE</p>
            <h1>
              LEADS.
              <br />
              <em>PRICING.</em>
            </h1>
          </div>
          <p>
            Review every package enquiry, track the sales status and change the rates used by the
            public calculator.
          </p>
        </div>
        <div className="admin-stats">
          <article>
            <span>TOTAL REQUESTS</span>
            <strong>{requests.length}</strong>
          </article>
          <article>
            <span>NEW</span>
            <strong>{newCount}</strong>
          </article>
          <article>
            <span>WON — FIRST MONTH VALUE</span>
            <strong>{formatINR(wonInr)}</strong>
            {wonUsd > 0 && <small>+ {formatMoney(wonUsd, "USD")}</small>}
          </article>
        </div>
        <div className="admin-tabs">
          <button
            className={activeTab === "requests" ? "active" : ""}
            onClick={() => setActiveTab("requests")}
          >
            PACKAGE REQUESTS ({requests.length})
          </button>
          <button
            className={activeTab === "pricing" ? "active" : ""}
            onClick={() => setActiveTab("pricing")}
          >
            PRICING SETTINGS
          </button>
        </div>
        {message && (
          <p className="admin-message">
            <Check size={16} /> {message}
          </p>
        )}

        {activeTab === "requests" ? (
          <div className="admin-requests">
            {requests.length === 0 ? (
              <div className="admin-empty">
                <h2>NO REQUESTS YET.</h2>
                <p>Build Your Own Package submissions will appear here.</p>
              </div>
            ) : (
              requests.map((request) => (
                <article className="admin-request" key={request.id}>
                  <RequestOverview request={request} />
                  <div className="request-controls">
                    <label>
                      STATUS
                      <select
                        value={request.status}
                        onChange={(event) =>
                          updateRequestLocal(request.id, {
                            status: event.target.value as PackageRequestStatus,
                          })
                        }
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="proposal-sent">Proposal sent</option>
                        <option value="won">Won</option>
                        <option value="lost">Lost</option>
                      </select>
                    </label>
                    <label>
                      ADMIN NOTES
                      <textarea
                        rows={3}
                        value={request.adminNotes}
                        onChange={(event) =>
                          updateRequestLocal(request.id, { adminNotes: event.target.value })
                        }
                        placeholder="Call notes, next step, proposal details..."
                      />
                    </label>
                    <button
                      onClick={() => persistRequest(request)}
                      disabled={saving === request.id}
                    >
                      <Save size={17} /> {saving === request.id ? "SAVING..." : "SAVE"}
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        ) : (
          <form
            className="admin-pricing"
            onSubmit={async (event) => {
              event.preventDefault();
              setSaving("pricing");
              setMessage("");
              try {
                const saved = await savePricing({ data: pricing });
                setPricing(saved);
                setMessage("Public calculator pricing updated.");
              } catch (error) {
                setMessage(error instanceof Error ? error.message : "Could not save pricing");
              } finally {
                setSaving("");
              }
            }}
          >
            <div className="pricing-editor-head">
              <div>
                <h2>INDIA RATE CARD</h2>
                <p>
                  These INR values power the homepage and Indian Build Your Own estimate.
                  International prices use the rounded USD rate card in code.
                </p>
              </div>
              <button type="submit" disabled={saving === "pricing"}>
                <Save size={17} /> {saving === "pricing" ? "SAVING..." : "SAVE ALL RATES"}
              </button>
            </div>
            <div className="pricing-fields">
              {(Object.entries(PRICING_LABELS) as Array<[keyof ServicePricing, string]>).map(
                ([key, label]) => (
                  <label key={key}>
                    {label}
                    <span>
                      ₹
                      <input
                        type="number"
                        min={0}
                        step={50}
                        value={pricing[key]}
                        onChange={(event) =>
                          setPricing((current) => ({
                            ...current,
                            [key]: Number(event.target.value) || 0,
                          }))
                        }
                      />
                    </span>
                  </label>
                ),
              )}
            </div>
          </form>
        )}
      </section>
    </main>
  );
}

function RequestOverview({ request }: { request: PackageRequestRecord }) {
  const currency = (request.estimate.currency || "INR") as CurrencyCode;
  return (
    <>
      <div className="request-top">
        <div>
          <span>
            {new Date(request.createdAt).toLocaleString("en-IN")} ·{" "}
            {currency === "USD" ? "INTERNATIONAL / USD" : "INDIA / INR"}
          </span>
          <h2>{request.company || request.name}</h2>
          <p>
            {request.name} • <a href={`mailto:${request.email}`}>{request.email}</a> •{" "}
            <a href={`tel:${request.phone}`}>{request.phone}</a>
          </p>
        </div>
        <div className="request-value">
          <span>FIRST MONTH</span>
          <strong>{formatMoney(request.estimate.firstMonthTotal, currency)}</strong>
          <small>
            {formatMoney(request.estimate.setupTotal, currency)} setup +{" "}
            {formatMoney(request.estimate.monthlyTotal, currency)}/mo
          </small>
        </div>
      </div>
      <details>
        <summary>
          VIEW PACKAGE DETAILS{" "}
          <span>{request.estimate.lines.filter((line) => !line.discount).length} services</span>
        </summary>
        <div className="request-details">
          <ul>
            {request.estimate.lines.map((line) => (
              <li key={line.label}>
                <span>{line.label}</span>
                <b>
                  {line.complimentary ? (
                    "FREE"
                  ) : (
                    <>
                      {line.setup !== 0 &&
                        `${line.setup < 0 ? "−" : ""}${formatMoney(Math.abs(line.setup), currency)} setup`}
                      {line.setup !== 0 && line.monthly !== 0 && " + "}
                      {line.monthly !== 0 &&
                        `${line.monthly < 0 ? "−" : ""}${formatMoney(Math.abs(line.monthly), currency)}/mo`}
                    </>
                  )}
                </b>
              </li>
            ))}
          </ul>
          <p>
            <strong>RETAINER TERM</strong>
            {request.selection.retainerMonths || 1} month
            {(request.selection.retainerMonths || 1) === 1 ? "" : "s"}
          </p>
          {request.estimate.complimentary?.length > 0 && (
            <p>
              <strong>COMPLIMENTARY</strong>
              {request.estimate.complimentary.join(" · ")}
            </p>
          )}
          {request.selection.otherDetails && (
            <p>
              <strong>CLIENT DETAILS</strong>
              {request.selection.otherDetails}
            </p>
          )}
          <small>
            Request ID: {request.id} • Email notification:{" "}
            {request.emailNotificationSent ? "sent" : "not sent"}
          </small>
        </div>
      </details>
    </>
  );
}
