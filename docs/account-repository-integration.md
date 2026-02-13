---
sidebar_label: 'Account & Repository Integration Configuration'
title: 'Account & Repository Integration Configuration'
sidebar_position: 4
---

# Why Do GitHub Integrations Fail, Disconnect, or Refuse to Link Properly?

If your **GitHub Integration fails, Disconnects unexpectedly, or Refuses to link your account or repository**, the issue is rarely your application logic.

In most cases, OAuth appears to complete successfully, the repository exists, and the account is valid. However, publishing, syncing, or repository access fails due to token scope issues, expired credentials, installation mismatches, repository permission conflicts, or environment misconfiguration.

This is one of the most common blockers in modern development workflows where applications depend on GitHub for authentication, repository access, CI/CD triggers, or automated deployments.

The key insight is simple: **most GitHub integration failures are OAuth, permission, or installation configuration issues** — not API implementation problems.

Across GitHub Apps, OAuth Apps, and repository-based integrations, these failures typically arise from mismatches between access tokens, app installations, organization permissions, repository visibility, and environment separation.

## A Practical Mental Model: Where GitHub Integrations Commonly Break

Most GitHub integration failures fall into one of these areas:

1. **OAuth Token and Expiration Issues**: Access tokens may expire, be revoked, or belong to a different session. Re-authentication may appear successful, but the stored token may be outdated or incorrectly scoped.
2. **App Installation and Repository Access**: GitHub Apps must be installed on specific repositories or organizations. If the app is not installed on the correct repository, API calls will fail even though authentication succeeds.
3. **Permission Scopes and Organization Restrictions**: Required scopes such as repo, workflow, admin:repo_hook, or read:org may not be granted. Organization-level restrictions can block third-party app access.
4. **Account Linking Conflicts**: Users may attempt to link multiple GitHub accounts, previously linked accounts may still be associated, or cached credentials may cause mismatches between the active GitHub session and stored integration credentials.
5. **Environment and Deployment Mismatch**: Development environments may use one GitHub app configuration while production uses another. Redirect URIs, client IDs, or secrets may not match between environments.

Identifying which integration layer is failing usually resolves the issue quickly.

## Who This Guide Is For

This guide is especially relevant if:
- GitHub OAuth completes but repositories are not accessible
- The integration disconnects automatically after some time
- Publishing or syncing to GitHub fails
- Organization repositories are not visible
- You see permission, installation, or linking errors

## Fast Diagnostic Table: Error Message to Root Cause Mapping

| Error Message Seen | Most Likely Root Cause | Configuration Layer | What to Check First |
| :--- | :--- | :--- | :--- |
| 401 Unauthorized | Expired or revoked OAuth token | OAuth Token | Re-authenticate and verify token storage |
| 403 Forbidden | Missing repository or organization permissions | Permission Scopes | Confirm required GitHub scopes and org policies |
| Repository not found | App not installed on target repository | App Installation | Verify GitHub App installation settings |
| Account already linked | Existing stored integration or conflict | Account Linking | Disconnect previous account and relink cleanly |
| Integration disconnects randomly | Token expiration or session invalidation | OAuth Token | Check token refresh and revocation status |
| Works in development, fails in production | Mismatched GitHub app credentials | Environment Configuration | Verify client ID, secret, and redirect URI |
| Organization access denied | Org restricts third-party apps | Organization Policy | Approve app in organization settings |

## Frequently Asked Questions

<details>
<summary>
### Why does GitHub OAuth succeed but repository access fails?
</summary>

OAuth authentication confirms identity, but it does not guarantee repository access. If the GitHub App is not installed on the specific repository or lacks required permissions, API calls will fail.

#### What to do
- Verify GitHub App installation on the target repository
- Confirm required permissions such as repo and workflow
- Reinstall the app if permissions were recently updated
</details>

<details>
<summary>
### Why does the integration disconnect automatically?
</summary>

Access tokens may expire, be revoked, or invalidated if the GitHub account password changes or if permissions are modified. Stored tokens may also become outdated.

#### What to do
- Re-authenticate the GitHub account
- Verify token refresh handling
- Ensure tokens are securely stored and not overwritten
</details>

<details>
<summary>
### Why am I getting 403 Forbidden errors from GitHub APIs?
</summary>

This typically indicates missing scopes or organization-level restrictions. Even if the user has access to the repository, the GitHub App may not.

#### What to do
- Review required scopes in GitHub App settings
- Confirm organization allows third-party applications
- Check repository-level permission assignments
</details>

<details>
<summary>
### Why does account linking fail or show “Account already linked”?
</summary>

This usually happens when a GitHub account is already associated with another user profile or when cached session data conflicts with stored integration records.

#### What to do
- Disconnect existing GitHub integration
- Clear cached sessions
- Relink the correct account in a clean session
</details>

<details>
<summary>
### Why does it work in development but not in production?
</summary>

Development and production often use separate GitHub Apps or different OAuth credentials. A mismatch in client ID, secret, or redirect URI will cause authentication or linking failures.

#### What to do
- Verify production GitHub App credentials
- Ensure redirect URI matches exactly
- Confirm correct environment variables are configured
</details>

---

<div class="doc-footer-cta">

### Stuck or need deeper assistance?
Get support from experts and move your project forward with confidence.

[Get started → HelpViber](https://viber.helpviber.com)

</div>
