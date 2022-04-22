import ReactCountryFlag from 'react-country-flag'


export function Flag({ nationality }) {
    return (
        <ReactCountryFlag
            countryCode={nationality}
            // countryCode={nationality?.slice(0, 2)}
            svg
            style={{
              width: '3rem',
              height: '3rem',
              objectFit: 'cover',
            }}
          />
    )
}