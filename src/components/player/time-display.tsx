import { useMemo } from "react";
import { Fragment } from "react/jsx-runtime";

const TimeDisplay = ({ seconds }: { seconds: number }) => {
  const minutes = useMemo(() => Math.floor(seconds / 60), [seconds]);
  const hours = useMemo(() => Math.floor(minutes / 60), [minutes]);

  if (seconds == null) return null;

  return (
    <Fragment>
      <span className="text-xs text-muted-foreground min-w-8">
        {hours}:{minutes % 60}:{Math.floor(seconds % 60)}
      </span>
    </Fragment>
  );
};

export default TimeDisplay;
