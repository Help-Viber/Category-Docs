---
sidebar_label: 'Preview & Rendering Configuration'
title: 'Preview & Rendering Configuration'
sidebar_position: 7
---

# Why Does Preview Rendering Fail or Show Blank Content Even When the App Works?

If your **Preview environment loads but shows blank content, Partially rendered UI, or Fails to display expected data**, the issue is rarely the core frontend logic.

In most cases, the application builds successfully, routes are defined correctly, and components compile without errors. However, the preview fails due to environment configuration differences, missing runtime variables, authentication restrictions, data-fetching failures, or build-time vs runtime mismatches.

Preview environments are often sandboxed, ephemeral, or isolated from full production services. Because of this, they behave differently from local development or live production systems.

The key insight is simple: **most preview rendering failures are environment isolation, data access, or runtime configuration issues** — not component-level bugs.

Across modern frontend frameworks and deployment platforms, preview failures typically arise from mismatches between build-time configuration, runtime environment variables, authentication context, API accessibility, and routing behavior.

## A Practical Mental Model: Where Preview Environments Commonly Break

Most preview rendering issues fall into these areas:

1. **Missing Environment Variables in Preview**: Preview deployments often require explicit environment variable configuration. If API keys, database URLs, or authentication secrets are missing, data fetching silently fails, resulting in blank pages.
2. **Authentication Context Not Available**: Preview builds may not inherit authentication context properly. Protected routes can render nothing if the session is invalid or if authentication providers are not configured for preview domains.
3. **API or Backend Not Accessible**: Preview environments may not have access to production databases, external APIs, or whitelisted IP addresses. Requests fail silently or return empty responses.
4. **Build-Time vs Runtime Configuration Mismatch**: Frameworks that rely on build-time environment injection may not receive updated variables during preview. Public and server-side variables may behave differently.
5. **Routing and Base Path Issues**: Client-side routing can break in preview environments if base paths, rewrites, or fallback routes are not configured properly.

Identifying which preview layer is failing usually resolves the issue quickly.

## Who This Guide Is For

This guide is especially relevant if:
- The preview URL loads but shows a blank screen
- The UI renders but data is missing
- Everything works locally but not in preview
- Protected routes fail silently
- API calls return empty responses only in preview

## Fast Diagnostic Table: Error Message to Root Cause Mapping

| Error Message Seen | Most Likely Root Cause | Configuration Layer | What to Check First |
| :--- | :--- | :--- | :--- |
| Blank page, no console error | Missing environment variable | Environment Configuration | Verify preview environment variables |
| Data not loading in preview | Backend inaccessible or wrong API URL | API Access | Check API base URL and credentials |
| Redirect to login repeatedly | Authentication not configured for preview domain | Authentication Context | Confirm allowed domains in auth provider |
| Works locally, blank in preview | Build-time environment mismatch | Build Configuration | Verify public vs server variables |
| Protected route shows nothing | Session not persisted in preview | Session Handling | Check cookie and domain configuration |
| 404 on refresh in preview | Missing rewrite or fallback rule | Routing Configuration | Configure preview routing rules |

## Frequently Asked Questions

<details>
<summary>
### Why does my preview environment show a blank screen with no errors?
</summary>

This often happens when required environment variables are missing. API calls may fail silently if base URLs or authentication keys are undefined.

#### What to do
- Verify all required environment variables are configured for preview
- Check console and network tab for failed API requests
- Ensure build-time variables are correctly injected
</details>

<details>
<summary>
### Why does data not load in preview but works locally?
</summary>

Preview deployments may use different API endpoints or lack access to protected services. Environment variables may reference production-only resources.

#### What to do
- Confirm API base URL for preview
- Ensure preview environment has access to required services
- Verify correct credentials are configured
</details>

<details>
<summary>
### Why are protected routes not rendering in preview?
</summary>

Authentication providers may not recognize preview domains as allowed origins. Sessions may fail to initialize.

#### What to do
- Add preview domain to allowed redirect URLs
- Verify authentication provider configuration
- Check cookie domain and secure flags
</details>

<details>
<summary>
### Why does preview break after publishing new changes?
</summary>

Some platforms cache previous builds or reuse outdated environment variables. If variables changed but were not reconfigured in preview settings, rendering may fail.

#### What to do
- Trigger a clean redeploy
- Reconfirm environment variables
- Clear platform cache if supported
</details>

<details>
<summary>
### Why does refreshing the preview URL result in 404?
</summary>

Client-side routing frameworks require proper rewrite rules. Without fallback routing, deep links fail in preview environments.

#### What to do
- Configure rewrite rules to point all routes to index file
- Verify hosting platform routing configuration
</details>

---

<div class="doc-footer-cta">

### Stuck or need deeper assistance?
Get support from experts and move your project forward with confidence.

[Get started → HelpViber](https://viber.helpviber.com)

</div>
