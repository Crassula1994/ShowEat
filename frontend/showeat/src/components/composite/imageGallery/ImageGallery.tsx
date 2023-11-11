/* Import */
import styled from "@emotion/styled";
import Image from "next/image";
import { useState } from "react";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface ImageGalleryProps {
    images: string[];
}

interface ThumbnailProps {
    isDefault: boolean;
    isSelected: boolean;
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const GalleryContainer = styled("div")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    gap: 1em;

    // Interaction Attribute
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
`;

const ImageWrapper = styled("div")`
    // Position Attribute
    position: relative;

    // Box Model Attribute
    width: 100%;
    box-sizing: border-box;
    aspect-ratio: 1 / 1;
    overflow: hidden;

    // Style Attribute
    border: 1px solid ${(props) => props.theme.colors.gray2};
    border-radius: 20px;
    background-color: white;
`;

const ThumbnailContainer = styled("div")`
    // Layout Attribute
    display: flex;
    justify-content: space-between;
    align-items: center;

    // Box Model Attribute
    width: 100%;
`;

const ThumbnailWrapper = styled("div")<ThumbnailProps>`
    // Position Attribute
    position: relative;

    // Box Model Attribute
    width: 16%;
    box-sizing: border-box;
    aspect-ratio: 1 / 1;
    overflow: hidden;

    // Style Attribute
    border: ${(props) =>
        props.isSelected
            ? `3px solid ${props.theme.colors.secondary3}`
            : `1px solid ${props.theme.colors.gray2}`};
    border-radius: 20px;
    background-color: white;

    // Interaction Attribute
    cursor: ${(props) => (props.isDefault ? "default" : "pointer")};
`;

// ----------------------------------------------------------------------------------------------------

/* Image Gallery Component */
function ImageGallery(props: ImageGalleryProps) {
    // States and Variables
    const { images } = props;
    const defaultImageUrl: string = "/assets/images/loading-blur.png";
    const [selectedImage, setSelectedImage] = useState<string>(images[0] || defaultImageUrl);
    const filledImages = [...images];
    while (filledImages.length < 5) {
        filledImages.push(defaultImageUrl);
    }

    // Function for Handling Thumbnail Click
    const handleThumbnailClick = (image: string) => {
        if (image !== defaultImageUrl) {
            setSelectedImage(image);
        }
    };

    return (
        <GalleryContainer>
            <ImageWrapper>
                <Image
                    src={selectedImage}
                    alt="selected-menu-image"
                    fill
                    sizes="(min-width: 50em) 25vw, (min-width: 20em) 50vw, 100vw"
                    priority
                    placeholder="blur"
                    style={{ objectFit: "contain" }}
                    blurDataURL={defaultImageUrl}
                />
            </ImageWrapper>
            <ThumbnailContainer>
                {filledImages.map((image, index) => (
                    <ThumbnailWrapper
                        key={index}
                        isDefault={image === defaultImageUrl}
                        isSelected={image !== defaultImageUrl && image === selectedImage}
                        onClick={() => handleThumbnailClick(image)}
                    >
                        <Image
                            src={image}
                            alt={`menu-thumbnail-${index}`}
                            fill
                            sizes="(min-width: 50em) 25vw, (min-width: 20em) 50vw, 100vw"
                            priority
                            placeholder="blur"
                            style={{ objectFit: "cover" }}
                            blurDataURL={defaultImageUrl}
                        />
                    </ThumbnailWrapper>
                ))}
            </ThumbnailContainer>
        </GalleryContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default ImageGallery;
