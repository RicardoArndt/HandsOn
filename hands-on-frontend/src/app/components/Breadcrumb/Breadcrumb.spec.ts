import { BreadcrumbBuilder, BreadcrumbData } from './Breadcrumb';

describe('BreadcrumbData', () => {
    describe('getIcon', () => {
        it('deve trazer corretamente os icons', () => {
            const breadcrumbData = BreadcrumbData.build(
                {
                    data: {
                      breadcrumb: {
                        title: 'Gef',
                        icon: 'fas fa-home'
                      }
                    },
                    url: [{ path: '/' }],
                    children: [{
                        data: {
                          breadcrumb: {
                            title: 'Breadcrumb 1',
                            icon: 'icon1'
                          }
                        },
                        url: [{ path: 'breadcrumb/1' }],
                        children: [
                            {
                                data: {
                                  breadcrumb: {
                                    title: 'Breadcrumb 2',
                                    icon: 'icon2'
                                  }
                                },
                                url: [{ path: 'breadcrumb/2' }],
                                children: [
                                    {
                                        data: {
                                          breadcrumb: {
                                            title: 'Breadcrumb 3',
                                            icon: 'icon3'
                                          }
                                        },
                                        url: [{ path: 'breadcrumb/3' }],
                                        children: []
                                    }
                                ]
                            }
                        ],
                    }]
                },
                {
                    url: ''
                });

            expect(breadcrumbData?.getIcon()).toBe('fas fa-home');
            expect(breadcrumbData?.getChildrenData()?.getIcon()).toBe('icon1');
            expect(breadcrumbData?.getChildrenData()?.getChildrenData()?.getIcon()).toBe('icon2');
            expect(breadcrumbData?.getChildrenData()?.getChildrenData()?.getChildrenData()?.getIcon()).toBe('icon3');
        });
    });

    describe('getUrl', () => {
        it('deve trazer corretamente as urls', () => {
            const breadcrumbData = BreadcrumbData.build(
                {
                    data: {
                      breadcrumb: {
                        title: 'Gef',
                        icon: 'fas fa-home'
                      }
                    },
                    url: [{ path: 'gef' }],
                    children: [{
                        data: {
                          breadcrumb: {
                            title: 'Breadcrumb 1',
                            icon: 'icon1'
                          }
                        },
                        url: [
                            { path: 'breadcrumb' },
                            { path: '1' }
                        ],
                        children: [
                            {
                                data: {
                                  breadcrumb: {
                                    title: 'Breadcrumb 2',
                                    icon: 'icon2'
                                  }
                                },
                                url: [
                                    { path: 'breadcrumb' },
                                    { path: '2' }
                                ],
                                children: [
                                    {
                                        data: {
                                          breadcrumb: {
                                            title: 'Breadcrumb 3',
                                            icon: 'icon3'
                                          }
                                        },
                                        url: [
                                            { path: 'breadcrumb' },
                                            { path: '3' }
                                        ],
                                        children: []
                                    }
                                ]
                            }
                        ],
                    }]
                },
                {
                    url: ''
                });

            expect(breadcrumbData?.getUrl()).toBe('/gef');
            expect(breadcrumbData?.getChildrenData()?.getUrl()).toBe('/gef/breadcrumb/1');
            expect(breadcrumbData?.getChildrenData()?.getChildrenData()?.getUrl()).toBe('/gef/breadcrumb/1/breadcrumb/2');
            expect(breadcrumbData?.getChildrenData()?.getChildrenData()?.getChildrenData()?.getUrl())
                .toBe('/gef/breadcrumb/1/breadcrumb/2/breadcrumb/3');
        });
    });

    describe('getTitle', () => {
        it('deve trazer corretamente os titles', () => {
          const breadcrumbData = BreadcrumbData.build(
            {
                data: {
                  breadcrumb: {
                    title: 'Gef',
                    icon: 'fas fa-home',
                    name: 'Gef'
                  }
                },
                url: [{ path: '/' }],
                children: [{
                    data: {
                      breadcrumb: {
                        title: 'Breadcrumb 1',
                        icon: 'icon1',
                        name: 'Breadcrumb 1'
                      }
                    },
                    url: [{ path: 'breadcrumb/1' }],
                    children: [
                        {
                            data: {
                              breadcrumb: {
                                title: 'Breadcrumb 2',
                                icon: 'icon2'
                              }
                            },
                            url: [{ path: 'breadcrumb/2' }],
                            children: [
                                {
                                    data: {
                                      breadcrumb: {
                                        title: 'Breadcrumb 3',
                                        icon: 'icon3'
                                      }
                                    },
                                    url: [{ path: 'breadcrumb/3' }],
                                    children: []
                                }
                            ]
                        }
                    ],
                }]
            },
            {
                url: ''
            });

            expect(breadcrumbData?.getTitle()).toBe('Gef');
            expect(breadcrumbData?.getChildrenData()?.getTitle()).toBe('Breadcrumb 1');
            expect(breadcrumbData?.getChildrenData()?.getChildrenData()?.getTitle()).toBe('Breadcrumb 2');
            expect(breadcrumbData?.getChildrenData()?.getChildrenData()?.getChildrenData()?.getTitle()).toBe('Breadcrumb 3');
        });
    });

    describe('BreadcrumbBuilder', () => {
      it('build', () => {
        const breadcrumbData = BreadcrumbData.build(
          {
              data: {
                breadcrumb: {
                  title: 'Gef',
                  icon: 'fas fa-home',
                  name: 'Gef'
                }
              },
              url: [{ path: '/' }],
              children: [{
                  data: {
                    breadcrumb: {
                      title: 'Breadcrumb 1',
                      icon: 'icon1',
                      name: 'Breadcrumb 1'
                    }
                  },
                  url: [{ path: 'breadcrumb/1' }],
                  children: [
                      {
                          data: {
                            breadcrumb: {
                              title: 'Breadcrumb 2',
                              icon: 'icon2'
                            }
                          },
                          url: [{ path: 'breadcrumb/2' }],
                          children: [
                              {
                                  data: {
                                    breadcrumb: {
                                      title: 'Breadcrumb 3',
                                      icon: 'icon3'
                                    }
                                  },
                                  url: [{ path: 'breadcrumb/3' }],
                                  children: []
                              }
                          ]
                      }
                  ],
              }]
          },
          {
              url: ''
          });

          const builder = BreadcrumbBuilder.build(breadcrumbData);

          expect(builder[0].icon).toBe('fas fa-home');
          expect(builder[0].name).toBe('Gef');
          expect(builder[0].title).toBe('Gef');
          expect(builder[0].url).toBe('//');

          expect(builder[1].icon).toBe('icon1');
          expect(builder[1].name).toBe('Breadcrumb 1');
          expect(builder[1].title).toBe('Breadcrumb 1');
          expect(builder[1].url).toBe('///breadcrumb/1');
      });
    });
});
