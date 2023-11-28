function Login() {
  const loading = false;
  const error = false;

  return (
    <div className="container">
      <div className="py-[73px]">
        <img src="/images/logo.svg" alt="" />
      </div>

      <div className="bg-white rounded-t-[100px] pt-[421px] pb-[96px] px-[220px] flex flex-col items-center gap-[10px] min-h-[1597px]">
        <span className="text-[#F54D0D] text-[36px] font-bold tracking-[0.72px]">
          ВВЕДИТЕ СВОЙ ID
        </span>

        <div className="relative">
          <input
            type="number"
            disabled
            className="w-[640px] h-[160px] rounded-[32px] border-2 border-[#F54D0D] text-[#000] text-[96px] font-bold text-center"
          />

          <svg
            className="h-[72px] w-[85px] absolute top-1/2 -translate-y-1/2 -right-[107px]"
            aria-hidden="true"
          >
            <use xlinkHref="/sprites/sprite.svg#delete"></use>
          </svg>
        </div>

        <span className="text-[#000] text-[32px] font-bold">
          У меня пока нет ID
        </span>

        {loading ? (
          <div className="mt-[230px] flex flex-col gap-8 items-center">
            <svg className="h-[180px] w-[178px]" aria-hidden="true">
              <use xlinkHref="/sprites/sprite.svg#search"></use>
            </svg>

            <span className="text-[#000] text-[32px] font-bold">
              Идет поиск...
            </span>
          </div>
        ) : error ? (
          <div className="mt-[230px] flex flex-col gap-8 items-center">
            <svg className="h-[180px] w-[198px]" aria-hidden="true">
              <use xlinkHref="/sprites/sprite.svg#error"></use>
            </svg>

            <span className="text-[#F40A0A] text-[32px] font-bold text-center">
              Пользователь с таким ID не найден! Проверьте, что введен
              правильный код
            </span>
          </div>
        ) : (
          <div className="mt-[55px] grid grid-cols-[1fr_1fr_1fr] gap-9">
            {new Array(10)
              .fill("")
              .map(
                (item, index) =>
                  index > 0 && (
                    <div className="w-[160px] h-[160px] rounded-full border-2 border-[#8D1BFF] flex items-center justify-center text-[80px] font-bold text-[#000] duration-200 hover:bg-[#70F] hover:text-white cursor-pointer">
                      {index}
                    </div>
                  )
              )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
