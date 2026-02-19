# Security Notes

## Current Status

- Production dependency audit is currently clean:
  - `npm audit --omit=dev` reports `0 vulnerabilities`.
- Remaining audit findings are in development tooling dependencies.

## Why some advisories remain

The current ecosystem has an incompatibility chain for fully automated dev-tooling fixes:

- `npm audit fix --force` attempts to move to `eslint@10`.
- Current `eslint-plugin-react-hooks` peer range does not yet accept ESLint 10.
- Forcing this state breaks linting even though build/test may still pass.

Because of that, we do not apply `--force` fixes on `main` unless lint compatibility is restored.

## Safe Commands

- Check production vulnerabilities:
  - `npm audit --omit=dev`
- Check full dependency graph:
  - `npm audit`
- Validate app health:
  - `npm run build && npm run test:run && npm run lint`

## Revisit Trigger

Re-run the dev-tooling hardening pass when `eslint-plugin-react-hooks` releases support for ESLint 10 (or if the project decides to pin a compatible lint stack update).