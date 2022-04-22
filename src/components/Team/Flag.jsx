import ReactCountryFlag from 'react-country-flag'

export function Flag({ country }) {
  return (
    <ReactCountryFlag
      countryCode={country}
      // countryCode={country?.slice(0, 2)}
      svg
      style={{
        width: '3rem',
        height: '3rem',
        objectFit: 'cover',
      }}
    />
  )
}
