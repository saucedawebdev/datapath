export function getTimeGreeting(displayName = 'Learner') {
  const hour = new Date().getHours();
  const name = displayName?.trim() || 'Learner';

  if (hour < 12) {
    return {
      greeting: `Good morning, ${name}.`,
      subtitle: 'Ready to solve today\'s business problems?',
    };
  }
  if (hour < 17) {
    return {
      greeting: `Good afternoon, ${name}.`,
      subtitle: 'Your analytics workspace is ready.',
    };
  }
  return {
    greeting: `Good evening, ${name}.`,
    subtitle: 'Let\'s finish one more lesson.',
  };
}
