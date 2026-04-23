// server/utils/asyncHandler.js
// Wraps async route handlers so any thrown error is passed to next()
// instead of crashing the server silently as a 500.
//
// Usage:
//   router.get("/", asyncHandler(async (req, res) => { ... }));

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
  
  export default asyncHandler;