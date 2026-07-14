/**
 * Combine class strings, dropping falsy values.
 *
 * Native replacement for clsx (dependency principle §0.2): our components
 * combine flat strings and conditionals only — no object/array syntax
 * needed. If base/override class *conflicts* ever demand real merging,
 * tailwind-merge re-enters the discussion with a documented case.
 */
export function cx(
  ...classes: ReadonlyArray<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(' ');
}