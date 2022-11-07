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
      profile: {
        userId: string;
        isUserProfile?: boolean;
      };
      settings: undefined;
    }
  }
}
