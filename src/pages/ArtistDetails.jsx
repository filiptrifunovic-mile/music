import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";
import { useEffect } from "react";

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const {
    data: artistData,
    isFetching: isFetchingArtistDetails,
    error,
  } = useGetArtistDetailsQuery(artistId);

  console.log(artistData?.data[0]);

  if (isFetchingArtistDetails)
    return <Loader title="Loading artist details..." />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      {/* <DetailsHeader artistId={artistId} artistData={artistData} />

      <RelatedSongs
        data={artistData?.data[0]}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      /> */}
      <h3 className="linear  mt-10">{artistData?.data[0]?.attributes?.name}</h3>
      <div className="flex justify-center">
        <img
          src={artistData?.data[0]?.attributes?.artwork?.url}
          alt="artist"
          style={{ width: "200px", borderRadius: "55px", marginTop: "40px" }}
        />
      </div>
      <p className="text-gray-400 text-lg p-5" style={{ textAlign: "center" }}>
        Born: {artistData?.data[0]?.attributes?.bornOrFormed},<br />
        {artistData?.data[0]?.attributes?.origin}
      </p>
      <p
        className="text-gray-400 text-lg p-5"
        style={{ textAlign: "center" }}
      ></p>
      <p className="text-white mt-1 text-lg p-5 ">
        {artistData?.data[0]?.attributes?.artistBio}
      </p>
    </div>
  );
};

export default ArtistDetails;
