/**
 * useEffect does not trigger on render.
 * See https://github.com/facebook/react/issues/14050#issuecomment-438173736.
 * @TODO 2019-05-15 Check if this can be removed
 */

const React = require.requireActual('react');
module.exports = { ...React, useEffect: React.useLayoutEffect };
