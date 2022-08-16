describe('test with mock data if the data is correctly presented', () => {
    it('should return the right values', () => {
        cy.intercept(
            'GET', 
            'https://api.openweathermap.org/data/2.5/weather?q=ghent&units=metric&appid=e7a90afe281296f42d13ad88d019073d', 
            { fixture: 'get_details_city_name.json' }
        );

        cy.intercept(
            'GET', 
            'https://api.openweathermap.org/data/2.5/onecall?lat=51.05&lon=3.7167&exclude=current%2Cminutely%2Calerts&units=metric&appid=e7a90afe281296f42d13ad88d019073d', 
            { fixture: 'get_hourly_daily_details.json' }
        );

        cy.visit('http://localhost:3000/');

        cy.get('[data-cy=location]', { timeout: 10000 }).contains('Ghent, BE');
        cy.get('[data-cy=date_time]').contains('Tuesday, 16 August 2022 | Local time: 08:58 PM');
        
        cy.get('[data-cy=weather_details]').contains('Clouds');
        cy.get('[data-cy=weather_current_temp]').contains('21°');
        cy.get('[data-cy=weather_realfeel]').contains('21°');
        cy.get('[data-cy=weather_humidity]').contains('68%');
        cy.get('[data-cy=weather_wind_speed]').contains('7 km/h');
        cy.get('[data-cy=weather_visibility]').contains('10 km');
        cy.get('[data-cy=weather_sunrise]').contains('06:33 AM');
        cy.get('[data-cy=weather_sunset]').contains('09:05 PM');
        cy.get('[data-cy=weather_temp_high]').contains('24°');
        cy.get('[data-cy=weather_temp_low]').contains('20°');
    });
});