export default function CircledText(props: { text: string; scale?: string }) {
  return (
    <div className="relative flex items-center justify-center mb-5">
      <svg
        style={{
          marginTop: `${props.text.length * 1.2}%`,
          marginBottom: `${props.text.length * 1.4}%`,
          scale: props.scale ?? "1 1",
          //   scale: `${props.text.length / 6} ${props.text.length / 12}`,
          height: "40px",
        }}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 123 39"
      >
        <path
          stroke="#46A627"
          stroke-linecap="round"
          stroke-width="3"
          d="M101.735 7.406c18.488 5.329 27.197 10.172 6.43 20.557-14.588 7.295-95.083 15.295-104.083 1.795-11.4-19.481 31.999-31 116.836-27.371"
        />
      </svg>
      {/* <img
        src="/circle-up.svg"
        alt="new.png"
        
      /> */}
      <p className="absolute text-3xl soyuz-grotesk w-max">{props.text}</p>
    </div>
  );
}
