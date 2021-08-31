
describe('Music-Api Connection Test', () => {
  describe('get /login', async () => {
    it('should return a 200', () => {
      const response = await request(app).get('http://localhost:3000/')
        expect(response.status).toBe(200);
    });
  });
});

// checks to see if the music-apps requests work
