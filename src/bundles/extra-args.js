export default {
  name: 'extra-args',
  getExtraArgs: (store) => {
    return {
      apiCreate: (urlPath, data) =>
        fetch(`http://127.0.0.1:8000/api${urlPath}/`, {
          credentials: 'same-origin',
          method: 'POST',
          body: JSON.stringify(data),
          headers: new Headers({ 'Content-Type': 'application/json' }),
        })
          .then((res) => res.json())
          .catch((err) => {
            throw err
          }),

      apiRead: (urlPath) =>
        // if your API requires an authentication token or whatnot
        // here would be a great place to select it from your store
        // and pass it along with the fetch. Then none of your individual
        // action creators need to worry about this.
        fetch(`http://127.0.0.1:8000/api${urlPath}`)
          .then((res) => res.json())
          .catch((err) => {
            // if you wanted to, you could look for errors caused
            // by failed authentication to trigger something
            // else on the store here if it existed. Such as redirecting
            // the user to a login page, or whatnot. You have access
            // to the store object itself.
            //
            // The store has all the action creators on it so you
            // can call `store.doWhatever()`
            // but for our purposes we'll just throw here
            throw err
          }),

      apiUpdate: (urlPath, id, data) =>
        fetch(`http://127.0.0.1:8000/api${urlPath}/${id}/`, {
          credentials: 'same-origin',
          method: 'PATCH',
          body: JSON.stringify(data),
          headers: new Headers({ 'Content-Type': 'application/json' }),
        })
          .then((res) => res.json())
          .catch((err) => {
            throw err
          }),

      apiDelete: (urlPath, id) =>
        fetch(`http://127.0.0.1:8000/api${urlPath}/${id}/`, {
          credentials: 'same-origin',
          method: 'DELETE',
        })
          .then((res) => res.status === 204 && id)
          .catch((err) => {
            throw err
          }),
    }
  },
}
