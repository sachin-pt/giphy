// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
// using this because as of 5.0.1 react-router-config doesnt support 'sensitive' (case sensitive) routes
import React from 'react'
import { Switch, Route, matchPath, Router } from 'react-router-dom'

export const renderRoutes = (routes, extraProps = {}, switchProps = {}) => {
  return routes ? (
    <Switch {...switchProps}>
      {routes.map((route, i) => (
        <Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          sensitive={route.sensitive}
          render={(props) =>
            route.render ? (
              route.render({ ...props, ...extraProps, route: route })
            ) : (
              <route.component {...props} {...extraProps} route={route} />
            )
          }
        />
      ))}
    </Switch>
  ) : null
}

export const matchRoutes = (routes, pathname, /* not public API */ branch = []) => {
  routes.some((route) => {
    const match = route.path
      ? matchPath(pathname, route)
      : branch.length
        ? branch[branch.length - 1].match // use parent match
        : Router.computeRootMatch(pathname) // use default "root" match

    if (match) {
      branch.push({ route, match })

      if (route.routes) {
        matchRoutes(route.routes, pathname, branch)
      }
    }

    return match
  })

  return branch
}
