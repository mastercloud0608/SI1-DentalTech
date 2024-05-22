import { JellyTriangle } from '@uiball/loaders';

export const LoadingLayout = () => {
    return (
        <div className="flex items-center justify-center h-screen w-screen">
            <JellyTriangle
                size={45}
                speed={0.7}
                color="black"   
            />
        </div>
    )
}
