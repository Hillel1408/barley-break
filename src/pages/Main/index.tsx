function Main() {
  return (
    <div className="container">
      <div className="py-[73px]">
        <img src="/images/logo.svg" alt="" />
      </div>

      <div className="relative min-h-[1597px]">
        <img src="/images/img-1.png" alt="" />

        <div className="absolute bottom-[158px] left-0 right-0 text-center flex flex-col gap-[70px] items-center">
          <svg className="h-[210px] w-[177px]" aria-hidden="true">
            <use xlinkHref="/sprites/sprite.svg#hand"></use>
          </svg>

          <span className="text-white text-[80px] font-bold">
            Коснитесь экрана, <br /> чтобы начать игру
          </span>
        </div>
      </div>
    </div>
  );
}

export default Main;
