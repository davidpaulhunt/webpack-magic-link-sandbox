import request from 'superagent';

export const loadCurrentUser = () =>
  Promise.resolve(request.get('/api/me')
    .set('Accept', 'application/json')
    .end((err, res) => {
      console.log(res);
      if (res.me) {
        return res.me;
      }

      return null;
    }));
