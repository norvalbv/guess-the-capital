import React, { ReactElement, ReactNode, useCallback } from 'react';
import { ErrorBoundary as ErrorBounds } from 'react-error-boundary';
import classNames from 'utils/classNames';

type ErrorBannerProps = {
  className?: string;
  errorMessage?: string;
};

export const ErrorBanner = ({ className, errorMessage }: ErrorBannerProps): ReactElement => {
  return (
    <div
      role="alert"
      className={classNames('flex items-center gap-4 rounded-lg bg-red-400 px-4 py-2', className)}
    >
      <b>
        {errorMessage ||
          'An error occured! Please try again or contact support if the error persists'}
      </b>

      <button
        onClick={(): void => window.location.reload()}
        type="button"
        className="rounded border border-neutral-500 px-4 py-2 hover:underline"
      >
        Try again
      </button>
    </div>
  );
};

export type ErrorBoundaryProps = {
  children?: ReactNode;
  className?: string;
  errorMessage?: string;
  // Used for automatically specifiying when the error boundary should reload.
  reset?: {
    resetKeys: string[];
    onReset: () => void;
  };
};

const ErrorBoundary = ({
  children,
  className,
  errorMessage,
  reset,
}: ErrorBoundaryProps): ReactElement => {
  const FallbackRender = useCallback(
    () => <ErrorBanner className={className} errorMessage={errorMessage} />,
    [className, errorMessage]
  );

  return (
    <ErrorBounds
      fallbackRender={FallbackRender}
      resetKeys={reset?.resetKeys}
      onReset={reset?.onReset}
    >
      {children}
    </ErrorBounds>
  );
};

export default ErrorBoundary;
