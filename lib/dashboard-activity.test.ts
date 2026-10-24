import { buildDashboardActivity } from './dashboard-activity';

describe('buildDashboardActivity', () => {
  const baseInput = {
    category: 'Transaction',
    title: 'Sent Money',
    description: 'To John',
    icon: '💸',
    iconBg: '#000',
    iconBorder: '#111',
    amountLabel: '-$50',
    amountColor: '#F00',
    tag: 'Sent',
    tagBg: '#333',
    tagColor: '#FFF',
  };

  it('adds occurredAt date if not provided', () => {
    const activity = buildDashboardActivity(baseInput);
    expect(activity.occurredAt).toBeInstanceOf(Date);
    expect(activity.category).toBe('Transaction');
  });

  it('keeps provided occurredAt date', () => {
    const specificDate = new Date('2024-01-01T00:00:00Z');
    const activity = buildDashboardActivity({ ...baseInput, occurredAt: specificDate });
    expect(activity.occurredAt).toBe(specificDate);
  });
});
