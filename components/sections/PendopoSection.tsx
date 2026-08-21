"use client";

import { motion } from "framer-motion";
import {
  Map,
  MapControls,
  MapMarker,
  MarkerContent,
  MarkerLabel,
  MarkerPopup,
} from "@/components/ui/map";

const longitude = 112.53248494611286;
const latitude = -7.92296644933308;

export default function PendopoSection() {
  return (
    <section
      id="pendopo"
      className="relative overflow-hidden bg-[var(--beige)] py-28"
    >
      {/* Decorative glow */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-emerald-700/10 blur-3xl" />

      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-yellow-700/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <span
            className="
              inline-flex
              rounded-full
              border
              border-emerald-700/30
              bg-emerald-900/10
              px-5
              py-2
              text-sm
              uppercase
              tracking-[0.2em]
              text-emerald-800
            "
          >
            Pendopo Giri Murti
          </span>

          <h2
            className="
              mt-6
              text-4xl
              font-bold
              text-[var(--coffee)]
              md:text-5xl
            "
            style={{ fontFamily: "Georgia, serif" }}
          >
            Ruang Kebersamaan Giri Murti
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-stone-600">
            Mengenal salah satu ruang yang menjadi bagian dari kehidupan
            dan kebersamaan masyarakat Giri Murti.
          </p>
        </motion.div>

        {/* MAP CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="
            relative
            overflow-hidden
            rounded-[32px]
            border
            border-stone-800
            bg-[#111714]
            shadow-2xl
            shadow-black/30
          "
        >
          <div className="h-[520px] w-full">

            <Map
  center={[longitude, latitude]}
  zoom={1.5}
  projection={{ type: "globe" }}
>

              {/* MAP CONTROLS */}
              <MapControls
                position="top-right"
                showZoom
                showCompass
                showFullscreen
              />

              {/* PENDOPO MARKER */}
              <MapMarker
                longitude={longitude}
                latitude={latitude}
              >
                <MarkerContent>

                  <div
                    className="
                      relative
                      flex
                      items-center
                      justify-center
                    "
                  >
                    {/* glow */}
                    <div
                      className="
                        absolute
                        h-10
                        w-10
                        rounded-full
                        bg-emerald-400/30
                        blur-md
                        animate-pulse
                      "
                    />

                    {/* marker */}
                    <div
                      className="
                        relative
                        h-4
                        w-4
                        rounded-full
                        border-2
                        border-white
                        bg-emerald-400
                        shadow-[0_0_20px_rgba(52,211,153,0.9)]
                      "
                    />
                  </div>

                  <MarkerLabel
                    position="top"
                    className="
                      rounded-full
                      border
                      border-emerald-400/30
                      bg-black/70
                      px-3
                      py-1
                      text-xs
                      font-semibold
                      text-white
                      backdrop-blur-md
                    "
                  >
                    Pendopo Giri Murti
                  </MarkerLabel>

                </MarkerContent>

                <MarkerPopup>
                  <div className="space-y-2">
                    <h3 className="font-semibold">
                      Pendopo Giri Murti
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      Titik lokasi Pendopo Giri Murti.
                    </p>
                  </div>
                </MarkerPopup>
              </MapMarker>

            </Map>

          </div>

          {/* MAP OVERLAY */}
          <div
            className="
              pointer-events-none
              absolute
              inset-x-0
              bottom-0
              h-32
              bg-gradient-to-t
              from-black/70
              to-transparent
            "
          />

          {/* BOTTOM INFO */}
          <div
            className="
              absolute
              bottom-0
              left-0
              z-10
              p-6
              md:p-8
            "
          >
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">
              Lokasi
            </p>

            <h3 className="mt-2 text-2xl font-bold text-white">
              Pendopo Giri Murti
            </h3>

            <p className="mt-1 text-sm text-white/70">
              -7.92296644933308, 112.53248494611286
            </p>
          </div>

        </motion.div>

        {/* GOOGLE MAPS BUTTON */}
        <div className="mt-8 flex justify-center">
          <a
            href="https://maps.app.goo.gl/75tA1C8nfqW68Enn9"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex
              items-center
              rounded-xl
              bg-emerald-700
              px-6
              py-3
              font-semibold
              text-white
              transition
              hover:-translate-y-0.5
              hover:bg-emerald-800
            "
          >
            Buka Lokasi
          </a>
        </div>

      </div>
    </section>
  );
}