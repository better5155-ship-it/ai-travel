'use client'

import { useState } from 'react'

const plans: any = {
  일본: {
    image:
      'https://images.unsplash.com/photo-1492571350019-22de08371fd3',

    days: {
      '2박3일': [
        {
          title: 'Day 1',
          items: [
            '✈️ 후쿠오카 도착',
            '☕ 감성 카페 방문',
            '🍜 하카타 라멘',
            '🌃 야타이 거리 산책',
          ],
        },

        {
          title: 'Day 2',
          items: [
            '🚃 유후인 이동',
            '♨️ 온천 체험',
            '📸 포토 스팟 방문',
            '🍡 일본 디저트 체험',
          ],
        },

        {
          title: 'Day 3',
          items: [
            '🛍️ 기념품 쇼핑',
            '☕ 마지막 카페 방문',
            '✈️ 귀국',
          ],
        },
      ],

      '3박4일': [
        {
          title: 'Day 1',
          items: [
            '✈️ 일본 도착',
            '☕ 감성 카페',
            '🍜 라멘 맛집',
          ],
        },

        {
          title: 'Day 2',
          items: [
            '🚃 근교 여행',
            '♨️ 온천 체험',
            '📸 사진 촬영',
          ],
        },

        {
          title: 'Day 3',
          items: [
            '🏯 전통 거리 탐방',
            '🍡 디저트 투어',
            '🌃 야경 감상',
          ],
        },

        {
          title: 'Day 4',
          items: [
            '🛍️ 쇼핑',
            '✈️ 귀국',
          ],
        },
      ],
    },

    cost: {
      flight: '40만원',
      hotel: '30만원',
      food: '15만원',
      total: '약 100만원',
    },
  },

  스위스: {
    image:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb',

    days: {
      '2박3일': [
        {
          title: 'Day 1',
          items: [
            '🏔️ 인터라켄 도착',
            '🚠 케이블카 탑승',
            '📸 설산 촬영',
          ],
        },

        {
          title: 'Day 2',
          items: [
            '🚞 빙하열차 탑승',
            '☕ 산장 카페',
            '🌌 별 보기',
          ],
        },

        {
          title: 'Day 3',
          items: [
            '🛍️ 기념품 쇼핑',
            '✈️ 귀국',
          ],
        },
      ],
    },

    cost: {
      flight: '120만원',
      hotel: '80만원',
      food: '30만원',
      total: '약 250만원',
    },
  },

  노르웨이: {
    image:
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963',

    days: {
      '2박3일': [
        {
          title: 'Day 1',
          items: [
            '❄️ 오슬로 도착',
            '☕ 북유럽 감성 카페',
            '🌃 야경 산책',
          ],
        },

        {
          title: 'Day 2',
          items: [
            '🚢 피오르드 투어',
            '📸 설경 촬영',
            '🌌 오로라 감상',
          ],
        },

        {
          title: 'Day 3',
          items: [
            '✈️ 귀국',
          ],
        },
      ],
    },

    cost: {
      flight: '150만원',
      hotel: '90만원',
      food: '40만원',
      total: '약 300만원',
    },
  },
}

export default function Home() {
  const [country, setCountry] = useState('일본')
  const [duration, setDuration] = useState('2박3일')

  const [loading, setLoading] = useState(false)

  const [result, setResult] = useState<any>(null)

  const generatePlan = () => {
    setLoading(true)
    setResult(null)

    setTimeout(() => {
      const selected = plans[country]

      setResult({
        image: selected.image,
        days: selected.days[duration],
        cost: selected.cost,
      })

      setLoading(false)
    }, 1500)
  }

  return (
    <main className="min-h-screen bg-gray-100 text-black">

      {/* HERO */}
      <section
        className="relative h-[500px] bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e)',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
          <div>
            <h1 className="text-5xl font-bold text-white md:text-7xl">
              AI 여행 일정 생성기
            </h1>

            <p className="mt-6 text-xl text-white">
              감성에 맞는 여행 일정을 자동으로 생성해보세요
            </p>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <div className="mx-auto max-w-6xl px-6 py-12">

        {/* 입력 카드 */}
        <div className="rounded-3xl bg-white p-8 shadow-xl">

          <div className="mb-6">
            <label className="mb-2 block text-lg font-bold text-black">
              여행지
            </label>

            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-lg text-black"
            >
              <option>일본</option>
              <option>스위스</option>
              <option>노르웨이</option>
            </select>
          </div>

          <div className="mb-8">
            <label className="mb-2 block text-lg font-bold text-black">
              여행 기간
            </label>

            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-lg text-black"
            >
              <option>2박3일</option>
              <option>3박4일</option>
            </select>
          </div>

          <button
            onClick={generatePlan}
            className="w-full rounded-2xl bg-black px-6 py-4 text-lg font-bold text-white transition hover:scale-[1.02]"
          >
            AI 일정 생성하기
          </button>
        </div>

        {/* 로딩 */}
        {loading && (
          <div className="mt-10 rounded-3xl bg-white p-8 text-center shadow-xl">
            <div className="animate-pulse text-2xl font-bold text-black">
              ✨ AI가 여행 일정을 생성 중입니다...
            </div>
          </div>
        )}

        {/* 결과 */}
        {result && (
          <div className="mt-12 overflow-hidden rounded-3xl bg-white shadow-xl">

            <img
              src={result.image}
              alt={country}
              className="h-[400px] w-full object-cover"
            />

            <div className="p-8">

              <h2 className="text-5xl font-bold text-black">
                {country} 여행
              </h2>

              <p className="mt-3 text-xl text-gray-700">
                {duration} 추천 일정
              </p>

              {/* DAY 카드 */}
              <div className="mt-10 grid gap-6 md:grid-cols-2">

                {result.days.map((day: any, index: number) => (
                  <div
                    key={index}
                    className="rounded-3xl border border-gray-200 bg-gray-50 p-6 shadow-sm"
                  >
                    <h3 className="text-3xl font-bold text-black">
                      {day.title}
                    </h3>

                    <div className="mt-5 space-y-3">

                      {day.items.map((item: string, idx: number) => (
                        <div
                          key={idx}
                          className="rounded-2xl bg-white p-4 text-lg font-medium text-black shadow"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* 비용 */}
              <div className="mt-10 grid gap-4 md:grid-cols-4">

                <div className="rounded-2xl bg-blue-50 p-5">
                  <p className="text-sm text-gray-700">
                    항공
                  </p>

                  <p className="mt-2 text-2xl font-bold text-black">
                    ✈️ {result.cost.flight}
                  </p>
                </div>

                <div className="rounded-2xl bg-blue-50 p-5">
                  <p className="text-sm text-gray-700">
                    숙소
                  </p>

                  <p className="mt-2 text-2xl font-bold text-black">
                    🏨 {result.cost.hotel}
                  </p>
                </div>

                <div className="rounded-2xl bg-blue-50 p-5">
                  <p className="text-sm text-gray-700">
                    식비
                  </p>

                  <p className="mt-2 text-2xl font-bold text-black">
                    🍜 {result.cost.food}
                  </p>
                </div>

                <div className="rounded-2xl bg-black p-5 text-white">
                  <p className="text-sm text-gray-300">
                    예상 총 비용
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    💰 {result.cost.total}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
