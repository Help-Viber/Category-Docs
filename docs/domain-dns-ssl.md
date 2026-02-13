---
sidebar_label: 'Domain, DNS & SSL Configuration'
title: 'Domain, DNS & SSL Configuration'
sidebar_position: 6
---

# Why Do Custom Domains Break Even When DNS Settings Look Correct?

If your **Custom domain stops working, SSL status changes unexpectedly, DNS records appear correct but the site does not resolve, or Ownership conflicts occur after platform migration**, the issue is rarely random.

In most cases, the DNS records are partially correct, the domain is properly purchased, and the application is deployed. However, failures occur because of propagation delays, conflicting DNS records, stale verification entries, platform ownership locks, SSL reissuance problems, or incomplete migration cleanup.

This is one of the most common and confusing blocking issues in production systems. Custom domain configuration involves external DNS providers, hosting platforms, certificate authorities, and verification systems — all of which must align perfectly.

The key insight is simple: **most custom domain and SSL failures are DNS state, verification, or certificate lifecycle issues** — not application-level problems.

Across hosting providers and managed platforms, these issues typically arise from misalignment between DNS records, verification tokens, SSL certificate issuance, domain ownership validation, and platform migration behavior.

## A Practical Mental Model: Where Custom Domain Configurations Commonly Break

Most custom domain, DNS, and SSL issues fall into one of these areas:

1. **DNS Record Conflicts**: Multiple A, AAAA, or CNAME records pointing to different targets can cause inconsistent resolution. Old records from previous platforms may still exist.
2. **Propagation and Caching Delays**: DNS changes are not immediate. TTL values and global propagation can cause different users to see different results for hours.
3. **Platform Ownership and Verification Conflicts**: Domains previously connected to another project or platform may remain locked until explicitly removed. Verification TXT records may conflict after migrations.
4. **SSL Certificate Lifecycle Issues**: Certificates may fail to issue if DNS is not fully propagated. Automatic renewals may temporarily switch status to “pending” or “invalid” if verification fails.
5. **Mixed HTTP/HTTPS and Redirect Rules**: Incorrect redirect configuration can cause SSL warnings, infinite redirects, or intermittent HTTPS failures.

Identifying which layer is failing usually makes the resolution predictable.

## Who This Guide Is For

This guide is especially relevant if:
- Your custom domain worked previously but suddenly stopped
- DNS records look correct but the domain does not resolve
- SSL status changes to pending or invalid without changes
- You migrated platforms and now see ownership conflicts
- HTTPS works intermittently or shows certificate warnings

## Fast Diagnostic Table: Error Message to Root Cause Mapping

| Error Message Seen | Most Likely Root Cause | Configuration Layer | What to Check First |
| :--- | :--- | :--- | :--- |
| Domain not resolving | Incorrect A or CNAME record | DNS Records | Verify DNS target matches hosting provider |
| SSL pending or invalid | DNS not fully propagated | SSL Lifecycle | Confirm DNS propagation globally |
| Domain already in use | Previously connected to another project | Ownership Verification | Remove domain from old project |
| Random SSL status changes | Automatic certificate renewal failed | SSL Lifecycle | Check certificate renewal logs |
| Works for some users, not others | DNS propagation or caching issue | Propagation | Wait for TTL expiration |
| HTTPS redirect loop | Conflicting redirect rules | Redirect Configuration | Review HTTP to HTTPS rules |
| Site works via platform URL but not custom domain | Missing verification or DNS mismatch | Ownership / DNS | Verify TXT and CNAME records |

## Frequently Asked Questions

<details>
<summary>
### Why does my domain show “invalid configuration” even though DNS looks correct?
</summary>

DNS changes may not have fully propagated, or there may be hidden conflicting records such as old A records or duplicate CNAME entries.

#### What to do
- Check DNS using multiple global DNS check tools
- Remove conflicting A, AAAA, or CNAME records
- Verify TTL settings and allow full propagation time
</details>

<details>
<summary>
### Why is SSL stuck in pending or keeps changing status?
</summary>

SSL certificates depend on correct DNS resolution. If verification fails during issuance or renewal, the SSL status may switch between pending and invalid.

#### What to do
- Confirm DNS records resolve correctly worldwide
- Ensure no conflicting records exist
- Wait for propagation before forcing reissuance
</details>

<details>
<summary>
### Why am I seeing “Domain already in use” after migration?
</summary>

Domains connected to previous projects or platforms must be explicitly removed before being added elsewhere. The previous ownership link may still exist.

#### What to do
- Remove the domain from the previous project
- Clear verification records if necessary
- Retry domain verification on the new platform
</details>

<details>
<summary>
### Why does HTTPS sometimes work and sometimes fail?
</summary>

This usually indicates partial DNS propagation or inconsistent caching across regions.

#### What to do
- Wait for full DNS propagation
- Clear local DNS cache
- Verify SSL certificate status after propagation completes
</details>

<details>
<summary>
### Why does the platform URL work but the custom domain does not?
</summary>

This typically indicates incomplete DNS configuration or missing domain verification records.

#### What to do
- Verify CNAME or A record targets
- Confirm verification TXT records are present
- Recheck domain setup instructions from your hosting provider
</details>

---

<div class="doc-footer-cta">

### Stuck or need deeper assistance?
Get support from experts and move your project forward with confidence.

[Get started → HelpViber](https://viber.helpviber.com)

</div>
