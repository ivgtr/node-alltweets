type params = {
  screen_name: string
  include_rts?: boolean
  max_id?: number
}

type paramsEx = params & {
  count: number
  exclude_replies: boolean
  include_rts: boolean
  tweet_mode: string
}
