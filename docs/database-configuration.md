---
sidebar_label: 'Database Configuration'
title: 'Database Configuration'
sidebar_position: 1
---

# Why Database Connections Fail Even When Everything Looks Correct?

If you are seeing errors such as **Unauthorized**, **Forbidden**, **Invalid API key**, **Connection timeout**, or **Not authorized to execute command**, your **database connection and authentication setup failures** are usually not broken.

In most cases, it is connected and reachable, but it is not permitted to perform the operation your application is requesting.

This is one of the most common blocking issues in modern full stack development, especially when transitioning from frontend implementation to real data persistence, authentication, and production deployment.

The key insight is simple: **most database connection failures are configuration failures**, not query or business logic failures.

Across managed platforms such as Supabase and MongoDB Atlas, these issues typically arise from misalignment between authentication layers, permissions, environment configuration, deployment context, and security policies.

## A Simple Mental Model: The Five Layers Where Database Connections Break

Nearly every recurring database connection or authentication failure falls into one of the following layers:

1. **Permissions and Roles**: The database user exists, but lacks the required privileges. Row Level Security may be enabled without the correct policies. Public or anonymous keys are often used for privileged backend operations.
2. **Environment Variables**: The application works locally but fails after deployment due to missing, outdated, or incorrectly injected environment variables.
3. **Managed vs External Database Conflicts**: Platforms may default to internal managed databases, restrict schema execution, or override external connections without making the behavior explicit.
4. **Network and Access Restrictions**: IP allowlists, SSL requirements, incorrect ports, or blocked networking rules commonly cause connection timeouts or fetch failures.
5. **Schema and Migration Execution**: Automated migrations may fail due to insufficient privileges or restricted execution contexts, leading to runtime errors caused by partially applied schemas.

Identifying which layer is failing usually makes the resolution straightforward.

## Who This Guide Is For

This guide is especially relevant if:
- Your application connects successfully but fails at runtime
- Everything works locally but breaks in production
- You are using Supabase, MongoDB Atlas, or another managed cloud database
- Error messages reference authorization, permissions, or network access

## Fast Diagnostic Table: Error Message to Root Cause Mapping

| Error Message Seen | Most Likely Root Cause | Configuration Layer | What to Check First |
| :--- | :--- | :--- | :--- |
| Unauthorized | Using public or anonymous key for privileged operations | Permissions and Roles | Verify service role usage and RLS policies |
| Forbidden | Role exists but lacks required privileges | Permissions and Roles | Check readWrite, admin, or custom role mapping |
| Invalid API key | Wrong or outdated key in environment variables | Environment Variables | Confirm correct project keys and redeploy |
| Connection timeout | IP allowlist or SSL misconfiguration | Network and Access | Check IP allowlist, ports, and SSL settings |
| Not authorized to execute command | Insufficient privileges for requested operation | Permissions and Schema | Validate user roles and DDL permissions |
| Works locally, fails in production | Missing or incorrect production environment variables | Environment Variables | Compare local and production configuration |
| Tables not created automatically | DDL restricted or wrong execution context | Schema and Migrations | Run migrations manually or use service role |
| App connects to wrong database | Internal database still linked or cached credentials | Managed vs External | Disconnect internal database and redeploy |

## Frequently Asked Questions

<details>
<summary>
### Why am I getting “Unauthorized” or “Not authorized to execute command” even though my database is connected?
</summary>

This occurs when the connection is valid, but the credentials being used do not have permission to perform the requested operation.

In Supabase, this commonly means Row Level Security is enabled without appropriate policies, or that backend services are using public or anonymous keys instead of the service role key. In MongoDB Atlas, the database user may lack readWrite or admin privileges on the target database.

#### What to do
- Verify database user roles in your provider dashboard
- Ensure backend services use credentials with sufficient privileges
- Confirm the correct database name in the connection string
</details>

<details>
<summary>
### Why does everything work locally but fail after deployment?
</summary>

This is almost always caused by missing or incorrect environment variables in production.

Local development environments often rely on .env files that are not mirrored correctly in deployment platforms. This leads to applications running with incomplete or outdated credentials.

#### What to do
- Compare local and production environment variables line by line
- Verify values in your hosting platform dashboard
- Redeploy after correcting configuration issues
</details>

<details>
<summary>
### Why can’t my platform or automated agent create tables or run migrations?
</summary>

Many managed platforms restrict automated schema changes, especially DDL statements. If the executing agent lacks sufficient permissions or uses the wrong credentials, migrations may fail or only partially apply.

#### What to do
- Run schema creation manually using the database console
- Ensure backend services use credentials with DDL permissions
- Confirm whether your platform supports remote schema execution
</details>

<details>
<summary>
### Why does my app keep reconnecting to the wrong database?
</summary>

This typically happens when an internal managed database is still linked, cached credentials exist, or the platform defaults back to its internal configuration.

#### What to do
- Explicitly disconnect internal or default databases
- Clear stored credentials and relink the correct database
- Perform a clean redeploy after configuration changes
</details>

<details>
<summary>
### Why am I seeing connection timeouts or network errors?
</summary>

Connection timeouts are usually caused by network level restrictions rather than application code. Common causes include missing IP allowlist entries, incorrect SSL configuration, blocked ports, or incorrect hostnames.

#### What to do
- Verify IP allowlist settings for your deployment environment
- Confirm SSL requirements and port configuration
- Test the connection string using an external database client
</details>

---

<div class="doc-footer-cta">

### Stuck or need deeper assistance?
Get support from experts and move your project forward with confidence.

[Get started → HelpViber](https://viber.helpviber.com)

</div>
