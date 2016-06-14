import serialize from 'form-serialize';

export default () =>
  (form) =>
    serialize(form, { hash: true });
