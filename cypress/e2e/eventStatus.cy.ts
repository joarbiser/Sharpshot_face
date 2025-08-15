// cypress/e2e/eventStatus.cy.ts
describe('Event Status Badge E2E Tests', () => {
  beforeEach(() => {
    // Mock the API endpoint to return controlled test data
    cy.intercept('GET', '/api/betting/live-opportunities', { fixture: 'eventStatuses.json' }).as('getLiveOpportunities');
    cy.visit('/trading-terminal');
  });

  it('displays Upcoming badge for scheduled event with future start time', () => {
    // Mock event with status='scheduled' and start time 10 min in future
    const mockEvent = {
      id: 'test-event-1',
      sport: 'Baseball',
      game: 'Yankees vs Red Sox',
      market: 'Moneyline',
      betType: '+EV',
      line: 'Yankees vs Red Sox',
      mainBookOdds: 150,
      ev: 2.5,
      hit: 58,
      gameTime: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 min future
      confidence: 'medium',
      category: 'ev',
      normalizedEvent: {
        truthStatus: 'UPCOMING',
        providerRawStatus: 'scheduled'
      }
    };

    cy.intercept('GET', '/api/betting/live-opportunities', {
      statusCode: 200,
      body: { opportunities: [mockEvent] }
    }).as('getUpcomingEvent');

    cy.reload();
    cy.wait('@getUpcomingEvent');
    
    // Verify badge shows "Upcoming"
    cy.get('[data-testid="event-status-badge"]').should('contain.text', 'Upcoming');
    cy.get('[data-testid="event-status-badge"]').should('have.class', 'bg-blue-500');
  });

  it('displays Live badge for in_progress event', () => {
    const mockEvent = {
      id: 'test-event-2',
      sport: 'Basketball',
      game: 'Lakers vs Warriors',
      market: 'Spread',
      betType: '+EV',
      line: 'Lakers -3.5',
      mainBookOdds: -110,
      ev: 3.2,
      hit: 65,
      gameTime: new Date().toISOString(),
      confidence: 'high',
      category: 'ev',
      normalizedEvent: {
        truthStatus: 'LIVE',
        providerRawStatus: 'in_progress'
      }
    };

    cy.intercept('GET', '/api/betting/live-opportunities', {
      statusCode: 200,
      body: { opportunities: [mockEvent] }
    }).as('getLiveEvent');

    cy.reload();
    cy.wait('@getLiveEvent');
    
    // Verify badge shows "Live"
    cy.get('[data-testid="event-status-badge"]').should('contain.text', 'Live');
    cy.get('[data-testid="event-status-badge"]').should('have.class', 'bg-red-500');
  });

  it('displays Final badge for completed event', () => {
    const mockEvent = {
      id: 'test-event-3',
      sport: 'Soccer',
      game: 'Arsenal vs Chelsea',
      market: 'Total',
      betType: '+EV',
      line: 'Over 2.5',
      mainBookOdds: 120,
      ev: 1.8,
      hit: 55,
      gameTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      confidence: 'low',
      category: 'ev',
      normalizedEvent: {
        truthStatus: 'FINISHED',
        providerRawStatus: 'final'
      }
    };

    cy.intercept('GET', '/api/betting/live-opportunities', {
      statusCode: 200,
      body: { opportunities: [mockEvent] }
    }).as('getFinalEvent');

    cy.reload();
    cy.wait('@getFinalEvent');
    
    // Verify badge shows "Final"
    cy.get('[data-testid="event-status-badge"]').should('contain.text', 'Final');
    cy.get('[data-testid="event-status-badge"]').should('have.class', 'bg-gray-500');
  });

  it('displays unknown badge with tooltip for unknown status', () => {
    const mockEvent = {
      id: 'test-event-4',
      sport: 'Hockey',
      game: 'Rangers vs Bruins',
      market: 'Moneyline',
      betType: '+EV',
      line: 'Rangers vs Bruins',
      mainBookOdds: 105,
      ev: 1.2,
      hit: 52,
      gameTime: new Date().toISOString(),
      confidence: 'low',
      category: 'ev',
      normalizedEvent: {
        truthStatus: 'UNKNOWN',
        providerRawStatus: 'unknown'
      }
    };

    cy.intercept('GET', '/api/betting/live-opportunities', {
      statusCode: 200,
      body: { opportunities: [mockEvent] }
    }).as('getUnknownEvent');

    cy.reload();
    cy.wait('@getUnknownEvent');
    
    // Verify badge shows "—"
    cy.get('[data-testid="event-status-badge"]').should('contain.text', '—');
    
    // Verify tooltip appears on hover
    cy.get('[data-testid="event-status-badge"]').trigger('mouseover');
    cy.get('[role="tooltip"]').should('be.visible');
    cy.get('[role="tooltip"]').should('contain.text', 'Event status unavailable from provider');
  });
});