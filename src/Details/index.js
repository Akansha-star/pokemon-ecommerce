/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { DetailsLayout } from "./components/DetailsLayout";
import { ImageSection } from "./components/ImageSection";
import { ThumbnailSection } from "./components/ThumbnailSection";
import { MetaSection } from "./components/MetaSection";
import Buttons from "./components/Button/Buttons";
import { Loader } from "../common/Loader";

export function Details() {
  const { id } = useParams();
  const [detailPagId, setDetailPagId] = useState(Number(id));
  const [selectedImage, setSelectedImage] = useState("");
  const history = useHistory();

  const handleClickPrev = () => {
    history.push(`/pokemon/${detailPagId}`);
    if (detailPagId > 1) {
      setSelectedImage("");
      setDetailPagId(detailPagId - 1);
    }
  };

  const handleClickNext = () => {
    setSelectedImage("");
    console.log("handleClickNext", detailPagId);
    setDetailPagId(detailPagId + 1);
    history.push(`/pokemon/${detailPagId}`);
  };

  const useData = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      setIsLoading(true);
      fetch(`https://pokeapi.co/api/v2/pokemon/${detailPagId}`)
        .then((res) => res.json())
        .then((pokemonData) => {
          Promise.all(pokemonData.abilities.map((a) => fetch(a.ability.url)))
            .then((responses) =>
              Promise.all(responses.map((res) => res.json()))
            )
            .then((abilityData) => {
              setData({ ...pokemonData, abilities: abilityData });
              setIsLoading(false);
            });
        });
    }, [id, detailPagId]);

    return {
      data,
      isLoading,
    };
  };

  const { data, isLoading } = useData();

  if (!data) {
    return <span>Loading</span>;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <DetailsLayout>
      <ImageSection
        alt={data.name}
        src={
          selectedImage || data.sprites.other["official-artwork"].front_default
        }
      />
      <ThumbnailSection
        name={data.name}
        selectedImage={selectedImage}
        handleMouseEnter={(e) => setSelectedImage(e.target.src)}
        thumbnailOneSrc={data.sprites.other["official-artwork"].front_default}
        thumbnailTwoSrc={data.sprites.other.dream_world.front_default}
        thumbnailThreeSrc={data.sprites.front_default}
        thumbnailFourSrc={data.sprites.back_default}
      />
      <Buttons
        handleClickPrev={handleClickPrev}
        handleClickNext={handleClickNext}
      />

      <MetaSection
        type={data.types[0].type.name}
        name={data.name}
        price={data.base_experience}
        stats={data.stats}
        abilities={data.abilities}
      />
    </DetailsLayout>
  );
}
