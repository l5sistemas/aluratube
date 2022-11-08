import React from 'react'
import styled from 'styled-components'
import config from '../config.json'
import { CSSReset } from '../src/components/CSSReset'
import Menu from '../src/components/Menu'
import { StyledTimeline } from '../src/components/Timeline'
import imgBanner from '../src/images/banner.jpg'



function HomePage() {

  const estiloHomePage = { 
    // backgroundColor: "red" 
  }

  const [valorDoFiltro, setValorDoFiltro] = React.useState('Angular');

  // console.log(config.playlist);

  return (
    <>
    <CSSReset/>
    <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                // backgroundColor: "red",
            }}>
        <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro}/>
        <Header />
        <TimeLine searchValue={valorDoFiltro} playlists={config.playlist} />
      </div>
    </>
  )
}

export default HomePage




const StyledHeader = styled.div`
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
    .user-info{
      display: flex;
      align-items: center;
      width: 100%;
      padding: 16px 32px;
      gap: 16px;

    }
  `
const StyleBanner = styled.div`
  background-color: blue;
 
  background-image: url(${ ({bg}) => bg});
  
  height: 230px;
`

function Header() {
  return (
    <StyledHeader>
      <StyleBanner bg = {config.bg}/>
      
      <section className='user-info'>
        <img src={`https://github.com/${config.github}.png`} />
        <div>
          <h2>{config.name}</h2>
          <p>{config.job}</p>
        </div>
      </section>
    </StyledHeader>
  )
}

function TimeLine({searchValue, ...props}) {

  // console.log("dentro do componente: ", props)

  const playlistNames = Object.keys(props.playlists)

  return (
    <StyledTimeline>


      {playlistNames.map((playlistName) => {

        const videos = props.playlists[playlistName]
        // console.log(videos)

        return (
          <section key={playlistName}>
            <h2>{playlistName}</h2>
      <p></p>
            <div>
              {
                videos
                  .filter((video) => {
                    const titleNormalized = video.title.toLowerCase();
                    const searchValueNormalized = searchValue.toLowerCase();

                    return titleNormalized.includes(searchValueNormalized)
                  })
                  .map((video) => {
                    return (
                      <a key={video.url} href={video.url}>
                        <img src={video.thumb} />
                        <span>
                          {video.title}
                        </span>
                      </a>
                    )
                  }
                )
              }
            </div>
          </section>
        )

      })}
    </StyledTimeline>
  )
} 