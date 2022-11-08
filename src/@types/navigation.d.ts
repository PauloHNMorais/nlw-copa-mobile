export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      new: undefined;
      pools: undefined;
      find: undefined;
      details: {
        id: string;
        title: string;
      };
      myProfile: {
        userId: string;
        isUserProfile?: boolean;
      };
      settings: undefined;
      userProfile: {
        userId: string;
        isUserProfile?: boolean;
      };
    }
  }
}
