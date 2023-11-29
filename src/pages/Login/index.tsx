import classNames from "classnames";
import { Button, QrModal } from "components";
import { useEffect, useState } from "react";
import axios from "http/axios";

function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const success = false;

  const [active, setActive] = useState(false);
  const [value, setValue] = useState("");

  const date = new Date().toLocaleDateString("en-ca");

  useEffect(() => {
    value.length === 6 &&
      (async function fetchData() {
        try {
          setLoading(true);
          const response = await axios.post(
            "/v1/transactions/third-party-check",
            {
              user_id: value,
              day: date,
              hash: "#7aSJ!n67%8912sS",
            }
          );
        } catch (e: any) {
          setError(e.response?.data?.message);
        } finally {
          setLoading(false);
        }
      })();
  }, [value, date]);

  return (
    <>
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
              value={value}
              className={classNames(
                "w-[640px] h-[160px] rounded-[32px] border-2 text-[#000] text-[96px] font-bold text-center",
                success ? "border-[#000]" : "border-[#F54D0D]"
              )}
            />

            <svg
              className="h-[72px] w-[85px] absolute top-1/2 -translate-y-1/2 -right-[107px] cursor-pointer fill-black duration-200 active:fill-[#8D1BFF]"
              aria-hidden="true"
              onClick={() => {
                setValue((prev) => prev.slice(0, -1));
              }}
            >
              <use xlinkHref="/sprites/sprite.svg#delete"></use>
            </svg>
          </div>

          <span
            className="text-[#000] text-[32px] font-bold cursor-pointer"
            onClick={() => {
              setActive(true);
            }}
          >
            У меня пока нет ID
          </span>

          {value.length < 6 ? (
            <div className="mt-[55px] grid grid-cols-[1fr_1fr_1fr] gap-9">
              {new Array(10).fill("").map((item, index) => (
                <button
                  key={index}
                  className={classNames(
                    "w-[160px] h-[160px] rounded-full border-2 border-[#8D1BFF] flex items-center justify-center text-[80px] font-bold text-[#000] duration-200 active:bg-[#70F] active:text-white cursor-pointer disabled:cursor-default disabled:active:text-[#000] disabled:active:bg-[white]",
                    index === 0 && "order-1 col-start-2"
                  )}
                  onClick={() => {
                    setValue((prev) => prev + index);
                  }}
                  disabled={value.length === 6}
                >
                  {index}
                </button>
              ))}
            </div>
          ) : loading ? (
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
            <div className="mt-[230px] flex flex-col gap-[52px] items-center">
              <Button
                text="НАЧАТЬ"
                disabled={!success}
                className="w-[640px] bg-[#00B23C]"
              />

              {success ? (
                <p className="text-[#000] text-[32px] font-bold text-center">
                  Ну что, %username%, начнем игру? У вас будет 3 минуты, чтобы
                  собрать картинку из фрагментов
                </p>
              ) : (
                <p className="text-[#F40A0A] text-[32px] font-bold text-center">
                  %username%, вам уже начислены баллы за эту игру. За повторное
                  участие баллы не начисляются
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <QrModal active={active} setActive={setActive} />
    </>
  );
}

export default Login;
