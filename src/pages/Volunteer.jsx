import { useEffect, useMemo, useState } from 'react';
import { fetchActiveEvents } from '../api/events';
import { createVolunteer } from '../api/volunteers';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';

const INITIAL_FORM = {
  fullName: '',
  age: '',
  gender: '',
  phone: '',
  email: '',
};

export default function Volunteer() {
  const [formState, setFormState] = useState(INITIAL_FORM);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [activeEvents, setActiveEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [eventsError, setEventsError] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isInterestsOpen, setIsInterestsOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadActiveEvents() {
      setLoadingEvents(true);
      setEventsError(null);
      try {
        const data = await fetchActiveEvents();
        if (isMounted) {
          setActiveEvents(data || []);
        }
      } catch (err) {
        if (isMounted) {
          setEventsError(err?.message || 'Unable to load active events');
        }
      } finally {
        if (isMounted) setLoadingEvents(false);
      }
    }

    loadActiveEvents();
    return () => {
      isMounted = false;
    };
  }, []);

  const interestOptions = useMemo(() => {
    const titles = (activeEvents || [])
      .map((event) => event?.title || event?.name || event?.eventTitle)
      .filter(Boolean);
    const uniqueTitles = Array.from(new Set(titles));
    return ['General', ...uniqueTitles];
  }, [activeEvents]);

  const selectedLabel = useMemo(() => {
    if (!selectedInterests.length) return 'Select interests';
    if (selectedInterests.length === 1) return selectedInterests[0];
    return `${selectedInterests.length} interests selected`;
  }, [selectedInterests]);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const toggleInterest = (label) => {
    setSelectedInterests((prev) => {
      if (prev.includes(label)) {
        return prev.filter((item) => item !== label);
      }
      return [...prev, label];
    });
  };

  const resetForm = () => {
    setFormState(INITIAL_FORM);
    setSelectedInterests([]);
    setSubmitError(null);
    setSubmitSuccess(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);

    const trimmedPhone = formState.phone.trim();
    const trimmedEmail = formState.email.trim();

    if (!trimmedPhone && !trimmedEmail) {
      setSubmitError('Please provide at least a phone number or an email address.');
      return;
    }

    if (!selectedInterests.length) {
      setSubmitError('Please select at least one interest.');
      return;
    }

    const payload = {
      fullName: formState.fullName.trim(),
      age: Number(formState.age),
      gender: formState.gender,
      phone: trimmedPhone || undefined,
      email: trimmedEmail || undefined,
      interests: selectedInterests,
    };

    setSubmitting(true);
    try {
      await createVolunteer(payload);
      setSubmitSuccess(true);
      setFormState(INITIAL_FORM);
      setSelectedInterests([]);
    } catch (err) {
      setSubmitError(err?.message || 'Unable to submit your volunteer details.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-lasa-50 py-10 sm:py-12">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-lasa-600">Volunteer With LASA</h1>
          <p className="mt-3 text-sm text-lasa-500">
            Share your details and tell us which events you would like to support.
          </p>
        </div>

        <div className="mt-8 rounded-3xl border border-lasa-200 bg-white p-6 shadow-sm sm:p-8">
          {submitSuccess ? (
            <div className="space-y-4 text-center">
              <h2 className="text-2xl font-semibold text-lasa-600">Thank you for volunteering!</h2>
              <p className="text-sm text-lasa-500">
                We have received your details and will reach out soon.
              </p>
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center justify-center rounded-xl bg-lasa-600 px-6 py-3 text-sm font-semibold text-white hover:bg-lasa-700"
              >
                Submit another response
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitError && <ErrorState message={submitError} />}

              <div className="grid gap-6 md:grid-cols-2">
                <Field label="Full name" required>
                  <input
                    type="text"
                    name="fullName"
                    value={formState.fullName}
                    onChange={handleFieldChange}
                    required
                    className="mt-2 w-full rounded-xl border border-lasa-200 px-4 py-3 text-sm text-lasa-600 focus:border-lasa-500 focus:outline-none focus:ring-2 focus:ring-lasa-200"
                  />
                </Field>

                <Field label="Age" required>
                  <input
                    type="number"
                    name="age"
                    min="1"
                    value={formState.age}
                    onChange={handleFieldChange}
                    required
                    className="mt-2 w-full rounded-xl border border-lasa-200 px-4 py-3 text-sm text-lasa-600 focus:border-lasa-500 focus:outline-none focus:ring-2 focus:ring-lasa-200"
                  />
                </Field>

                <Field label="Gender" required>
                  <select
                    name="gender"
                    value={formState.gender}
                    onChange={handleFieldChange}
                    required
                    className="mt-2 w-full rounded-xl border border-lasa-200 bg-white px-4 py-3 text-sm text-lasa-600 focus:border-lasa-500 focus:outline-none focus:ring-2 focus:ring-lasa-200"
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                    <option value="Other">Other</option>
                  </select>
                </Field>

                <Field label="Phone">
                  <input
                    type="tel"
                    name="phone"
                    value={formState.phone}
                    onChange={handleFieldChange}
                    placeholder="(555) 123-4567"
                    className="mt-2 w-full rounded-xl border border-lasa-200 px-4 py-3 text-sm text-lasa-600 focus:border-lasa-500 focus:outline-none focus:ring-2 focus:ring-lasa-200"
                  />
                </Field>

                <Field label="Email" className="md:col-span-2">
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleFieldChange}
                    placeholder="you@example.com"
                    className="mt-2 w-full rounded-xl border border-lasa-200 px-4 py-3 text-sm text-lasa-600 focus:border-lasa-500 focus:outline-none focus:ring-2 focus:ring-lasa-200"
                  />
                </Field>
              </div>

              <div>
                <Field label="Interests" required>
                  <div className="relative mt-2">
                    <button
                      type="button"
                      onClick={() => setIsInterestsOpen((prev) => !prev)}
                      className="flex w-full items-center justify-between rounded-xl border border-lasa-200 bg-white px-4 py-3 text-sm text-lasa-600 focus:border-lasa-500 focus:outline-none focus:ring-2 focus:ring-lasa-200"
                      aria-expanded={isInterestsOpen}
                    >
                      <span>{selectedLabel}</span>
                      <svg
                        className={`h-4 w-4 transition-transform ${isInterestsOpen ? 'rotate-180' : ''}`}
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 8l4 4 4-4" />
                      </svg>
                    </button>

                    {isInterestsOpen && (
                      <div className="absolute z-10 mt-2 w-full rounded-xl border border-lasa-200 bg-white p-4 shadow-lg">
                        {loadingEvents && <LoadingState message="Loading active events..." />}
                        {!loadingEvents && eventsError && <ErrorState message={eventsError} />}
                        {!loadingEvents && (
                          <div className="space-y-3">
                            {interestOptions.map((option) => (
                              <label key={option} className="flex items-center gap-3 text-sm text-lasa-600">
                                <input
                                  type="checkbox"
                                  checked={selectedInterests.includes(option)}
                                  onChange={() => toggleInterest(option)}
                                  className="h-4 w-4 rounded border-lasa-300 text-lasa-600 focus:ring-lasa-200"
                                />
                                <span>{option}</span>
                              </label>
                            ))}
                            {interestOptions.length === 1 && (
                              <p className="text-sm text-lasa-500">No active events right now.</p>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <p className="mt-2 text-xs text-lasa-500">
                    Select "General" for ongoing volunteering, plus any current events.
                  </p>
                </Field>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full items-center justify-center rounded-xl bg-lasa-600 px-6 py-3 text-sm font-semibold text-white hover:bg-lasa-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? 'Submitting...' : 'Submit volunteer form'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({ label, required, children, className }) {
  return (
    <label className={`block text-sm font-semibold text-lasa-600 ${className || ''}`.trim()}>
      <span>
        {label}{required && <span className="text-red-500"> *</span>}
      </span>
      {children}
    </label>
  );
}
