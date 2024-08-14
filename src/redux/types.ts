export type GetResponseType<TData> = {
  message: string;
  result: TResult<TData>;
};
export type MutationResponseType<TData> = {
  result: TData;
};
export type GetSingleResponseType<TData> = MutationResponseType<TData> & {
  message: string;
};
export type TResult<TData> = {
  pageIndex: number;
  pageCount: number;
  totalRecordCount: number;
  numberOfPagesToShow: number;
  startPageIndex: number;
  stopPageIndex: number;
  data: TData[];
};
