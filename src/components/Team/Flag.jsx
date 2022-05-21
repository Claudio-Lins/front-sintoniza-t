import ReactCountryFlag from 'react-country-flag'

export function Flag({ country }) {
  return (
    <ReactCountryFlag
      countryCode={country}
      svg
      style={{
        width: '2rem',
        height: '2rem',
        objectFit: 'cover',
      }}
    />
  )
}
