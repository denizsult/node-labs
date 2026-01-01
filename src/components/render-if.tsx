type RenderIfProps = {
  condition: unknown;
  children: any;
  fallback?: unknown;
};

export const RenderIf = ({
  condition,
  children,
  fallback = null,
}: RenderIfProps) => {
  return !!condition ? children : fallback;
};
