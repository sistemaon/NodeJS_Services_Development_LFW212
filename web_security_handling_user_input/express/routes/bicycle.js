
const express = require('express');
const router = express.Router();
const model = require('../model');

const hasOwnProperty = (o, p) => Object.prototype.hasOwnProperty.call(o, p);

const validateData = (o) => {
  let valid = o !== null && typeof o === 'object';
  valid = valid && hasOwnProperty(o, 'brand');
  valid = valid && hasOwnProperty(o, 'color');
  valid = valid && typeof o.brand === 'string';
  valid = valid && typeof o.color === 'string';
  return valid && {
    brand: o.brand,
    color: o.color
  };
}

const validateBody = (o) => {
  let valid = o !== null && typeof o === 'object';
  valid = valid && hasOwnProperty(o, 'data');
  valid = valid && o.data !== null && typeof o.data === 'object';
  const data = valid && validateData(o.data);
  return valid && data && {
    data: data
  };
}

const isIdValid = (n) => {
  n = Number(n);
  const MAX_SAFE = Math.pow(2, 53) - 1;
  return isFinite(n) && Math.floor(n) === n && Math.abs(n) <= MAX_SAFE;
}

const isParamsValid = (o) => {
  let valid = o !== null && typeof o === 'object';
  valid = valid && hasOwnProperty(o, 'id');
  valid = valid && isIdValid(o.id);
  return valid;
}

const badRequest = () => {
  const err = new Error('Bad Request');
  err.status = 400;
  return err;
}

router.get('/:id', function (req, res, next) {
  if (isParamsValid(req.params)) {
    model.bicycle.read(req.params.id, (err, result) => {
      if (err) {
        if (err.message === 'not found') next();
        else next(err);
      } else {
        const sanitizedResult = validateData(result);
        if (sanitizedResult) {
          res.send(sanitizedResult);
        } else {
          next(new Error('Server Error'));
        }
      }
    });
  } else {
    next(badRequest());
  }
});

router.post('/', function (req, res, next) {
  const id = model.bicycle.uid();
  const body = validateBody(req.body);
  if (body) {
    model.bicycle.create(id, body.data, (err) => {
      if (err) {
        next(err);
      } else {
        if (isIdValid(id)) res.status(201).send({ id });
        else next(new Error('Server Error'));
      }
    });
  } else {
    next(badRequest());
  }
});

router.post('/:id/update', function (req, res, next) {
  if (isParamsValid(req.params)) {
    const body = validateBody(req.body);
    if (body) {
      model.bicycle.update(req.params.id, body.data, (err) => {
        if (err) {
          if (err.message === 'not found') next();
          else next(err);
        } else {
          res.status(204).send();
        }
      });
    } else {
      next(badRequest());
    }
  } else {
    next(badRequest());
  }
});

router.put('/:id', function (req, res, next) {
  if (isParamsValid(req.params)) {
    const body = validateBody(body);
    if (body) {
      model.bicycle.create(req.params.id, body.data, (err) => {
        if (err) {
          if (err.message === 'resource exists') {
            model.bicycle.update(req.params.id, body.data, (err) => {
              if (err) next(err);
              else res.status(204).send();
            });
          } else {
            next(err);
          }
        } else {
          res.status(201).send({});
        }
      });
    } else {
      next(badRequest());
    }
  } else {
    next(badRequest());
  }
});

router.delete('/:id', function (req, res, next) {
  if (isParamsValid(req.params)) {
    model.bicycle.del(req.params.id, (err) => {
      if (err) {
        if (err.message === 'not found') next();
        else next(err);
      } else {
        res.status(204).send();
      }
    });
  } else {
    next(badRequest());
  }
});

module.exports = router;