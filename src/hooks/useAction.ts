import { AsyncThunk, unwrapResult, PayloadAction } from '@reduxjs/toolkit'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

export const useAsyncAction = <Arg, Returned>(actionCreator: AsyncThunk<Returned, Arg, {}>) => {
  const dispatch = useDispatch<any>()

  return useCallback(
    (arg: Arg) =>
      dispatch(actionCreator(arg))
        .then((result: PayloadAction) => unwrapResult(result))
        .catch((err: PayloadAction) => Promise.reject(err)),
    [dispatch, actionCreator],
  )
}
