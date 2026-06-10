import { Link } from 'react-router-dom';
import { formatEventDate } from '../../utils/dateDisplay';

export default function EventCard({ event, actions, onClick, to }) {
  const cover = event.coverImageUrl || event.flyerUrl || event.gallery?.[0];
  const isClickable = Boolean(onClick || to);
  const isButton = Boolean(onClick) && !to;
  const descriptionText = event.description || '';

  const handleKeyDown = (evt) => {
    if (!isClickable) return;
    if (evt.key === 'Enter' || evt.key === ' ') {
      evt.preventDefault();
      onClick();
    }
  };

  const lineClampTwo = {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  };

  const lineClampThree = {
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  };

  const content = (
    <div
      className={`flex h-full flex-col overflow-hidden rounded-2xl border border-lasa-200 bg-white shadow-sm transition-shadow hover:shadow-lg ${
        isClickable ? 'cursor-pointer hover:-translate-y-0.5' : ''
      }`}
      onClick={to ? undefined : onClick}
      onKeyDown={to ? undefined : handleKeyDown}
      role={isButton ? 'button' : undefined}
      tabIndex={isButton ? 0 : undefined}
    >
      <div className="relative w-full bg-lasa-100" style={{ aspectRatio: '4 / 3' }}>
        {cover ? (
          <img
            src={cover}
            alt={event.title}
            className="h-full w-full object-contain p-2"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-lasa-400">
            No image available
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-lasa-400">
            {formatEventDate(event.startDate, { variant: 'short' })}
          </p>
          <h3 className="mt-2 break-words text-base font-semibold text-lasa-600 sm:text-lg" style={lineClampTwo}>
            {event.title}
          </h3>
          {event.location && (
            <p className="mt-1 break-words text-sm text-lasa-500">{event.location}</p>
          )}
        </div>
        {descriptionText && (
          <p className="text-sm text-lasa-500 leading-relaxed whitespace-pre-line" style={lineClampThree}>
            {descriptionText}
          </p>
        )}
        {actions && (
          <div
            className="mt-auto flex flex-wrap gap-2"
            onClick={(evt) => evt.stopPropagation()}
          >
            {actions}
          </div>
        )}
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="block" aria-label={`View ${event.title}`}>
        {content}
      </Link>
    );
  }

  return content;
}
